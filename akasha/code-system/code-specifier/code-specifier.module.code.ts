import ts from "typescript"

export type Placed = {
  readonly start: number
  readonly end: number
  readonly text: string
}

type Taking = (node: ts.Node, took: (said: ts.Node | undefined) => void) => void

function reading(path: string, text: string, takes: Taking): readonly Placed[] {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS)
  const found: Placed[] = []
  const took = (node: ts.Node | undefined): undefined => {
    if (node === undefined || !ts.isStringLiteral(node)) return
    found.push({ start: node.getStart(source), end: node.getEnd(), text: node.text })
  }
  const walk = (node: ts.Node): undefined => {
    takes(node, took)
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return [...found].sort((one, two) => one.start - two.start)
}

export function placedIn(path: string, text: string): readonly Placed[] {
  return reading(path, text, (node, took) => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) took(node.moduleSpecifier)
    if (
      ts.isCallExpression(node) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) && node.expression.text === "require"))
    ) {
      took(node.arguments[0])
    }
    if (ts.isExternalModuleReference(node)) took(node.expression)
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument))
      took(node.argument.literal)
  })
}

export function spelledIn(path: string, text: string): readonly Placed[] {
  return reading(path, text, (node, took) => took(node))
}

export function specifiersIn(path: string, text: string): readonly string[] {
  return placedIn(path, text).map((one) => one.text)
}
