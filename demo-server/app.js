var express = require("../node_modules/express");
var app = express();
var path = require("path");

var jsonServer = require('../node_modules/json-server');
var server = jsonServer.create();
var router = jsonServer.router('demo-server/db.json');
var cookieParser = require('cookie-parser');

server.use(cookieParser("secret", {"path": "/"}));


server.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
	res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
	res.setHeader("Access-Control-Expose-Headers","Access-Control-Allow-Origin");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,X-Prototype-Version,Content-Type,Cache-Control,Pragma,Origin");
    next();
});

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname+'/../app/index.html'));
});

server.get('/products', function(req, res){
	var products = router.db.object.products;
	res.send(JSON.stringify( { success:true ,products: products}));
});

app.use(express.static(path.join(__dirname, '../')));
var http = require('http').Server(app);
http.listen(8080);

server.use(jsonServer.defaults);
server.use(router);
server.listen(5000);