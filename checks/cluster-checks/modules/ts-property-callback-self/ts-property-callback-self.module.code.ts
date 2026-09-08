import ts from "typescript"

export interface TstlPropertyCallbackSelfFinding {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly name: string
}

function functionTypesOf(type: ts.TypeNode): readonly ts.FunctionTypeNode[] {
  if (ts.isParenthesizedTypeNode(type)) return functionTypesOf(type.type)
  if (ts.isUnionTypeNode(type)) return type.types.flatMap(functionTypesOf)
  if (ts.isFunctionTypeNode(type)) return [type]
  return []
}

function hasExplicitThisParam(fn: ts.FunctionTypeNode): boolean {
  const first = fn.parameters[0]
  if (first === undefined) return false
  if (!ts.isIdentifier(first.name)) return false
  return ts.identifierToKeywordKind(first.name) === ts.SyntaxKind.ThisKeyword
}

export function scanTstlPropertyCallbackSelf(
  sf: ts.SourceFile
): readonly TstlPropertyCallbackSelfFinding[] {
  const filePath = sf.fileName
  const out: TstlPropertyCallbackSelfFinding[] = []

  function visit(node: ts.Node): undefined {
    if (
      ts.isPropertySignature(node) &&
      (ts.isInterfaceDeclaration(node.parent) || ts.isTypeLiteralNode(node.parent)) &&
      node.type !== undefined
    ) {
      const fns = functionTypesOf(node.type)
      if (fns.length > 0 && !fns.every(hasExplicitThisParam)) {
        const { line, character } = ts.getLineAndCharacterOfPosition(sf, node.getStart(sf))
        out.push({
          file: filePath,
          line: line + 1,
          column: character + 1,
          name: node.name.getText(sf),
        })
      }
    }
    ts.forEachChild(node, visit)
    return
  }

  ts.forEachChild(sf, visit)
  return out
}
