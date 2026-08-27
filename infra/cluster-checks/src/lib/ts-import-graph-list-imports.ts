import ts from "typescript"

export function listFileImports(sourceFile: ts.SourceFile): readonly string[] {
  const specifiers: string[] = []

  function visit(node: ts.Node): undefined {
    if (ts.isImportDeclaration(node)) {
      if (node.importClause?.isTypeOnly) return

      if (node.importClause?.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
        const namedImports = node.importClause.namedBindings
        const hasRuntimeImport = namedImports.elements.some((el) => !el.isTypeOnly)
        if (!node.importClause.name && !hasRuntimeImport) return
      }

      if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        specifiers.push(node.moduleSpecifier.text)
      }
      return
    }

    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments[0] !== undefined &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      specifiers.push(node.arguments[0].text)
    }

    if (ts.isExportDeclaration(node)) {
      if (node.isTypeOnly) return
      if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        specifiers.push(node.moduleSpecifier.text)
      }
      return
    }

    ts.forEachChild(node, visit)
  }

  ts.forEachChild(sourceFile, visit)
  return specifiers
}
