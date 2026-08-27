import ts from "typescript"

export interface MethodSignatureFinding {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly name: string
  readonly parentKind: "interface" | "type-literal"
  readonly parentName: string | null
}

function parentInfoOf(
  node: ts.MethodSignature
): { kind: "interface" | "type-literal"; name: string | null } | null {
  const parent = node.parent
  if (!parent) return null
  if (ts.isInterfaceDeclaration(parent)) {
    return { kind: "interface", name: parent.name.text }
  }
  if (ts.isTypeLiteralNode(parent)) {
    const grand = parent.parent
    if (grand && ts.isTypeAliasDeclaration(grand)) {
      return { kind: "type-literal", name: grand.name.text }
    }
    return { kind: "type-literal", name: null }
  }
  return null
}

export function scanMethodSignatures(sf: ts.SourceFile): readonly MethodSignatureFinding[] {
  const filePath = sf.fileName

  const out: MethodSignatureFinding[] = []

  function visit(node: ts.Node): undefined {
    if (ts.isMethodSignature(node)) {
      const parentInfo = parentInfoOf(node)
      if (parentInfo) {
        const { line, character } = ts.getLineAndCharacterOfPosition(sf, node.getStart(sf))
        out.push({
          file: filePath,
          line: line + 1,
          column: character + 1,
          name: node.name.getText(sf),
          parentKind: parentInfo.kind,
          parentName: parentInfo.name,
        })
      }
    }
    ts.forEachChild(node, visit)
  }

  ts.forEachChild(sf, visit)
  return out
}
