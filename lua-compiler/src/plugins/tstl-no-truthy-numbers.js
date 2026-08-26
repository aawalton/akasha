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
const SKIP_FLAGS = ts.TypeFlags.Any |
    ts.TypeFlags.Unknown |
    ts.TypeFlags.Never |
    ts.TypeFlags.TypeParameter |
    ts.TypeFlags.TypeVariable;
function typeIncludesLuaTruthinessBug(type) {
    if ((type.flags & SKIP_FLAGS) !== 0)
        return false;
    if (type.isUnion()) {
        return type.types.some(branchTriggers);
    }
    return branchTriggers(type);
}
function branchTriggers(type) {
    if ((type.flags & SKIP_FLAGS) !== 0)
        return false;
    if (type.getProperty("__tstlMultiReturn") !== undefined)
        return true;
    if ((type.flags & ts.TypeFlags.Number) !== 0)
        return true;
    if (type.isNumberLiteral())
        return type.value === 0;
    if ((type.flags & ts.TypeFlags.String) !== 0)
        return true;
    if (type.isStringLiteral())
        return type.value === "";
    return false;
}
function isExplicitComparisonOp(op) {
    return (op === ts.SyntaxKind.EqualsEqualsToken ||
        op === ts.SyntaxKind.EqualsEqualsEqualsToken ||
        op === ts.SyntaxKind.ExclamationEqualsToken ||
        op === ts.SyntaxKind.ExclamationEqualsEqualsToken ||
        op === ts.SyntaxKind.GreaterThanToken ||
        op === ts.SyntaxKind.LessThanToken ||
        op === ts.SyntaxKind.GreaterThanEqualsToken ||
        op === ts.SyntaxKind.LessThanEqualsToken);
}
function includesMultiReturn(type) {
    if (type.isUnion())
        return type.types.some(includesMultiReturn);
    return type.getProperty("__tstlMultiReturn") !== undefined;
}
function remedyFor(type) {
    if (includesMultiReturn(type)) {
        return "LuaMultiReturn values compile to Lua tables, which are always truthy. Destructure the multi-return first, then check the destructured fields explicitly.";
    }
    return 'In Lua, `0` and `""` are TRUTHY — this condition is false in TypeScript and true in the emitted Lua. Compare explicitly instead: `n > 0`, `s !== ""`.';
}
function makeDiagnostic(file, node, typeStr, type) {
    return {
        file,
        start: node.getStart(file),
        length: node.getWidth(file),
        messageText: `Lua truthiness bug: condition has type '${typeStr}'. ${remedyFor(type)}`,
        category: ts.DiagnosticCategory.Error,
        code: 90001,
        source: "tstl-no-truthy-numbers",
    };
}
function checkConditionNode(node, checker, sourceFile, diagnostics) {
    if (ts.isBinaryExpression(node)) {
        const op = node.operatorToken.kind;
        if (isExplicitComparisonOp(op)) {
            return;
        }
        if (op === ts.SyntaxKind.AmpersandAmpersandToken) {
            checkConditionNode(node.left, checker, sourceFile, diagnostics);
            return;
        }
        if (op === ts.SyntaxKind.BarBarToken) {
            checkConditionNode(node.left, checker, sourceFile, diagnostics);
            return;
        }
        if (op === ts.SyntaxKind.QuestionQuestionToken) {
            return;
        }
    }
    if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.ExclamationToken) {
        checkConditionNode(node.operand, checker, sourceFile, diagnostics);
        return;
    }
    if (ts.isConditionalExpression(node)) {
        checkConditionNode(node.condition, checker, sourceFile, diagnostics);
        return;
    }
    if (ts.isParenthesizedExpression(node)) {
        checkConditionNode(node.expression, checker, sourceFile, diagnostics);
        return;
    }
    const type = checker.getTypeAtLocation(node);
    if (typeIncludesLuaTruthinessBug(type)) {
        const typeStr = checker.typeToString(type);
        diagnostics.push(makeDiagnostic(sourceFile, node, typeStr, type));
    }
}
function visitNode(node, checker, sourceFile, diagnostics) {
    if (ts.isIfStatement(node)) {
        checkConditionNode(node.expression, checker, sourceFile, diagnostics);
    }
    else if (ts.isWhileStatement(node) || ts.isDoStatement(node)) {
        checkConditionNode(node.expression, checker, sourceFile, diagnostics);
    }
    else if (ts.isForStatement(node) && node.condition) {
        checkConditionNode(node.condition, checker, sourceFile, diagnostics);
    }
    else if (ts.isConditionalExpression(node)) {
        checkConditionNode(node.condition, checker, sourceFile, diagnostics);
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
