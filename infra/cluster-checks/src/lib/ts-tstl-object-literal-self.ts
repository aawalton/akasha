import ts from "typescript"

export interface TstlObjectLiteralSelfFinding {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly name: string
}

function hasThisVoidFirstParam(node: ts.MethodDeclaration): boolean {
  const first = node.parameters[0]
  if (first === undefined) return false
  if (!ts.isIdentifier(first.name)) return false
  if (ts.identifierToKeywordKind(first.name) !== ts.SyntaxKind.ThisKeyword) return false
  return first.type?.kind === ts.SyntaxKind.VoidKeyword
}

export function scanTstlObjectLiteralSelf(
  sf: ts.SourceFile
): readonly TstlObjectLiteralSelfFinding[] {
  const filePath = sf.fileName
  const out: TstlObjectLiteralSelfFinding[] = []

  function visit(node: ts.Node): undefined {
    if (
      ts.isMethodDeclaration(node) &&
      ts.isObjectLiteralExpression(node.parent) &&
      hasThisVoidFirstParam(node)
    ) {
      const { line, character } = ts.getLineAndCharacterOfPosition(sf, node.getStart(sf))
      out.push({
        file: filePath,
        line: line + 1,
        column: character + 1,
        name: node.name.getText(sf),
      })
    }
    ts.forEachChild(node, visit)
    return
  }

  ts.forEachChild(sf, visit)
  return out
}
