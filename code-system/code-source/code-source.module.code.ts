import ts from "typescript"

function kindOf(path: string): ts.ScriptKind {
  return path.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
}

export function parsedAs(path: string, text: string): ts.SourceFile {
  return ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, kindOf(path))
}

export function skimmedAs(path: string, text: string): ts.SourceFile {
  return ts.createSourceFile(path, text, ts.ScriptTarget.Latest, false, kindOf(path))
}

type Recovered = { readonly parseDiagnostics?: readonly ts.Diagnostic[] }

export function faultSaid(source: ts.SourceFile): string | null {
  const one = (source as ts.SourceFile & Recovered).parseDiagnostics?.[0]
  if (one === undefined) return null
  return ts.flattenDiagnosticMessageText(one.messageText, " ")
}

export function lineAt(source: ts.SourceFile, at: number): number {
  return source.getLineAndCharacterOfPosition(at).line + 1
}

export function lineOf(source: ts.SourceFile, node: ts.Node): number {
  return lineAt(source, node.getStart(source))
}

export function literalIn(node: ts.Node): string | null {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isTemplateHead(node)) return node.text
  return null
}

export function literalOf(node: ts.Expression): ts.ObjectLiteralExpression | null {
  if (ts.isObjectLiteralExpression(node)) return node
  if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) return literalOf(node.expression)
  return null
}

export function scoping(node: ts.Node): boolean {
  return (
    ts.isSourceFile(node) ||
    ts.isBlock(node) ||
    ts.isCaseBlock(node) ||
    ts.isCatchClause(node) ||
    ts.isForStatement(node) ||
    ts.isForInStatement(node) ||
    ts.isForOfStatement(node) ||
    ts.isFunctionDeclaration(node) ||
    ts.isFunctionExpression(node) ||
    ts.isArrowFunction(node) ||
    ts.isMethodDeclaration(node) ||
    ts.isConstructorDeclaration(node)
  )
}

export function exported(statement: ts.VariableStatement): boolean {
  return statement.modifiers?.some((one) => one.kind === ts.SyntaxKind.ExportKeyword) === true
}

export function typedImport(clause: ts.ImportClause): boolean {
  if (clause.isTypeOnly) return true
  if (clause.name !== undefined) return false
  const bound = clause.namedBindings
  if (bound === undefined || ts.isNamespaceImport(bound)) return false
  return bound.elements.every((one) => one.isTypeOnly)
}

export function erasedImport(clause: ts.ImportClause | undefined): boolean {
  if (clause === undefined) return false
  if (clause.isTypeOnly) return true
  if (clause.name !== undefined) return false
  const bound = clause.namedBindings
  if (bound === undefined || !ts.isNamedImports(bound)) return false
  return bound.elements.length > 0 && bound.elements.every((one) => one.isTypeOnly)
}

export function erasedExport(one: ts.ExportDeclaration): boolean {
  if (one.isTypeOnly) return true
  const clause = one.exportClause
  if (clause === undefined || !ts.isNamedExports(clause)) return false
  return clause.elements.length > 0 && clause.elements.every((each) => each.isTypeOnly)
}
