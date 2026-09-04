import * as ts from "typescript"
import type { Plugin } from "../transpile-plugins/transpile-plugins.module.code.ts"

type DiagnosticResult = ts.Diagnostic[] | undefined

const SKIP_FLAGS =
  ts.TypeFlags.Any |
  ts.TypeFlags.Unknown |
  ts.TypeFlags.Never |
  ts.TypeFlags.TypeParameter |
  ts.TypeFlags.TypeVariable

function typeIncludesLuaTruthinessBug(type: ts.Type): boolean {
  if ((type.flags & SKIP_FLAGS) !== 0) return false
  if (type.isUnion()) {
    return type.types.some(branchTriggers)
  }
  return branchTriggers(type)
}

function branchTriggers(type: ts.Type): boolean {
  if ((type.flags & SKIP_FLAGS) !== 0) return false
  if (type.getProperty("__tstlMultiReturn") !== undefined) return true
  if ((type.flags & ts.TypeFlags.Number) !== 0) return true
  if (type.isNumberLiteral()) return type.value === 0
  if ((type.flags & ts.TypeFlags.String) !== 0) return true
  if (type.isStringLiteral()) return type.value === ""
  return false
}

function isExplicitComparisonOp(op: ts.BinaryOperator): boolean {
  return (
    op === ts.SyntaxKind.EqualsEqualsToken ||
    op === ts.SyntaxKind.EqualsEqualsEqualsToken ||
    op === ts.SyntaxKind.ExclamationEqualsToken ||
    op === ts.SyntaxKind.ExclamationEqualsEqualsToken ||
    op === ts.SyntaxKind.GreaterThanToken ||
    op === ts.SyntaxKind.LessThanToken ||
    op === ts.SyntaxKind.GreaterThanEqualsToken ||
    op === ts.SyntaxKind.LessThanEqualsToken
  )
}

function includesMultiReturn(type: ts.Type): boolean {
  if (type.isUnion()) return type.types.some(includesMultiReturn)
  return type.getProperty("__tstlMultiReturn") !== undefined
}

function remedyFor(type: ts.Type): string {
  if (includesMultiReturn(type)) {
    return "LuaMultiReturn values compile to Lua tables, which are always truthy. Destructure the multi-return first, then check the destructured fields explicitly."
  }
  return 'In Lua, `0` and `""` are TRUTHY — this condition is false in TypeScript and true in the emitted Lua. Compare explicitly instead: `n > 0`, `s !== ""`.'
}

function makeDiagnostic(
  file: ts.SourceFile,
  node: ts.Node,
  typeStr: string,
  type: ts.Type
): ts.Diagnostic {
  return {
    file,
    start: node.getStart(file),
    length: node.getWidth(file),
    messageText: `Lua truthiness bug: condition has type '${typeStr}'. ${remedyFor(type)}`,
    category: ts.DiagnosticCategory.Error,
    code: 90001,
    source: "tstl-no-truthy-numbers",
  }
}

function checkConditionNode(
  node: ts.Expression,
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
  diagnostics: ts.Diagnostic[]
): undefined {
  if (ts.isBinaryExpression(node)) {
    const op = node.operatorToken.kind
    if (isExplicitComparisonOp(op)) {
      return
    }
    if (op === ts.SyntaxKind.AmpersandAmpersandToken) {
      checkConditionNode(node.left, checker, sourceFile, diagnostics)
      return
    }
    if (op === ts.SyntaxKind.BarBarToken) {
      checkConditionNode(node.left, checker, sourceFile, diagnostics)
      return
    }
    if (op === ts.SyntaxKind.QuestionQuestionToken) {
      return
    }
  }

  if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.ExclamationToken) {
    checkConditionNode(node.operand, checker, sourceFile, diagnostics)
    return
  }

  if (ts.isConditionalExpression(node)) {
    checkConditionNode(node.condition, checker, sourceFile, diagnostics)
    return
  }

  if (ts.isParenthesizedExpression(node)) {
    checkConditionNode(node.expression, checker, sourceFile, diagnostics)
    return
  }

  const type = checker.getTypeAtLocation(node)
  if (typeIncludesLuaTruthinessBug(type)) {
    const typeStr = checker.typeToString(type)
    diagnostics.push(makeDiagnostic(sourceFile, node, typeStr, type))
  }
}

function visitNode(
  node: ts.Node,
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
  diagnostics: ts.Diagnostic[]
): undefined {
  if (ts.isIfStatement(node)) {
    checkConditionNode(node.expression, checker, sourceFile, diagnostics)
  } else if (ts.isWhileStatement(node) || ts.isDoStatement(node)) {
    checkConditionNode(node.expression, checker, sourceFile, diagnostics)
  } else if (ts.isForStatement(node) && node.condition) {
    checkConditionNode(node.condition, checker, sourceFile, diagnostics)
  } else if (ts.isConditionalExpression(node)) {
    checkConditionNode(node.condition, checker, sourceFile, diagnostics)
  }

  ts.forEachChild(node, (child) => visitNode(child, checker, sourceFile, diagnostics))
}

const plugin: Plugin = {
  beforeTransform(program: ts.Program): DiagnosticResult {
    const checker = program.getTypeChecker()
    const diagnostics: ts.Diagnostic[] = []

    for (const sourceFile of program.getSourceFiles()) {
      if (sourceFile.isDeclarationFile) continue
      if (sourceFile.fileName.includes("node_modules")) continue

      visitNode(sourceFile, checker, sourceFile, diagnostics)
    }

    return diagnostics.length > 0 ? diagnostics : undefined
  },
}

export default plugin
