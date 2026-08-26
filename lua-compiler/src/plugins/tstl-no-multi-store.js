"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const ts = __importStar(require("typescript"));
function isMultiReturnType(type) {
    if (type.isUnion()) {
        return type.types.some(isMultiReturnType);
    }
    return !!type.getProperty("__tstlMultiReturn");
}
function makeDiagnostic(file, node, typeStr) {
    return {
        file,
        start: node.getStart(file),
        length: node.getWidth(file),
        messageText: `LuaMultiReturn misuse: expression of type '${typeStr}' is used outside a destructuring assignment or return statement. In Lua, only the first value is captured. Use destructuring: const [a, b] = fn()`,
        category: ts.DiagnosticCategory.Error,
        code: 90002,
        source: "tstl-no-multi-store",
    };
}
function isInSafeContext(node) {
    const parent = node.parent;
    if (!parent)
        return false;
    if (ts.isReturnStatement(parent))
        return true;
    if (ts.isVariableDeclaration(parent) && parent.initializer === node) {
        return ts.isArrayBindingPattern(parent.name);
    }
    if (ts.isBinaryExpression(parent) && parent.right === node) {
        return (parent.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
            ts.isArrayLiteralExpression(parent.left));
    }
    if (ts.isSpreadElement(parent) && parent.expression === node) {
        const grandparent = parent.parent;
        return (grandparent !== undefined &&
            ts.isArrayLiteralExpression(grandparent) &&
            grandparent.elements[grandparent.elements.length - 1] === parent);
    }
    if (ts.isElementAccessExpression(parent) && parent.expression === node) {
        return true;
    }
    if (ts.isParenthesizedExpression(parent)) {
        return isInSafeContext(parent);
    }
    return false;
}
function visitNode(node, checker, sourceFile, diagnostics) {
    if (ts.isCallExpression(node)) {
        const type = checker.getTypeAtLocation(node);
        if (isMultiReturnType(type) && !isInSafeContext(node)) {
            const typeStr = checker.typeToString(type);
            diagnostics.push(makeDiagnostic(sourceFile, node, typeStr));
        }
    }
    ts.forEachChild(node, (child) => visitNode(child, checker, sourceFile, diagnostics));
}
const plugin = {
    beforeTransform(program) {
        const checker = program.getTypeChecker();
        const diagnostics = [];
        for (const sourceFile of program.getSourceFiles()) {
            if (sourceFile.isDeclarationFile)
                continue;
            if (sourceFile.fileName.includes("node_modules"))
                continue;
            visitNode(sourceFile, checker, sourceFile, diagnostics);
        }
        return diagnostics.length > 0 ? diagnostics : undefined;
    },
};
exports.default = plugin;
