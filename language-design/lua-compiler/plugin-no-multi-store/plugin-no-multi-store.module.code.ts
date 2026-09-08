import * as ts from "typescript"
import type { Plugin } from "../transpile-plugins/transpile-plugins.module.code.ts"

type DiagnosticResult = ts.Diagnostic[] | undefined

function isMultiReturnType(type: ts.Type): boolean {
  if (type.isUnion()) {
    return type.types.some(isMultiReturnType)
  }
  return !!type.getProperty("__tstlMultiReturn")
}

function makeDiagnostic(file: ts.SourceFile, node: ts.Node, typeStr: string): ts.Diagnostic {
  return {
    file,
    start: node.getStart(file),
    length: node.getWidth(file),
    messageText: `LuaMultiReturn misuse: expression of type '${typeStr}' is used outside a destructuring assignment or return statement. In Lua, only the first value is captured. Use destructuring: const [a, b] = fn()`,
    category: ts.DiagnosticCategory.Error,
    code: 90002,
    source: "tstl-no-multi-store",
  }
}

function isInSafeContext(node: ts.Node): boolean {
  const parent = node.parent
  if (!parent) return false

  if (ts.isReturnStatement(parent)) return true

  if (ts.isExpressionStatement(parent) && parent.expression === node) return true

  if (ts.isVariableDeclaration(parent) && parent.initializer === node) {
    return ts.isArrayBindingPattern(parent.name)
  }

  if (ts.isBinaryExpression(parent) && parent.right === node) {
    return (
      parent.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      ts.isArrayLiteralExpression(parent.left)
    )
  }

  if (ts.isSpreadElement(parent) && parent.expression === node) {
    const grandparent = parent.parent
    return (
      grandparent !== undefined &&
      ts.isArrayLiteralExpression(grandparent) &&
      grandparent.elements[grandparent.elements.length - 1] === parent
    )
  }

  if (ts.isElementAccessExpression(parent) && parent.expression === node) {
    return true
  }

  if (ts.isParenthesizedExpression(parent)) {
    return isInSafeContext(parent)
  }

  return false
}

function visitNode(
  node: ts.Node,
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
  diagnostics: ts.Diagnostic[]
): undefined {
  if (ts.isCallExpression(node)) {
    const type = checker.getTypeAtLocation(node)
    if (isMultiReturnType(type) && !isInSafeContext(node)) {
      const typeStr = checker.typeToString(type)
      diagnostics.push(makeDiagnostic(sourceFile, node, typeStr))
    }
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
