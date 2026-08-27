import ts from "typescript"

export type EnumDeclarationKind = "enum" | "const-enum" | "declare-enum"

export interface EnumDeclarationFinding {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly name: string
  readonly kind: EnumDeclarationKind
}

function kindOf(node: ts.EnumDeclaration): EnumDeclarationKind {
  let isDeclare = false
  let isConst = false
  for (const m of node.modifiers ?? []) {
    if (m.kind === ts.SyntaxKind.DeclareKeyword) isDeclare = true
    else if (m.kind === ts.SyntaxKind.ConstKeyword) isConst = true
  }
  if (isDeclare) return "declare-enum"
  if (isConst) return "const-enum"
  return "enum"
}

export function scanEnumDeclarations(sf: ts.SourceFile): readonly EnumDeclarationFinding[] {
  const filePath = sf.fileName

  const out: EnumDeclarationFinding[] = []

  function visit(node: ts.Node): undefined {
    if (ts.isEnumDeclaration(node)) {
      const { line, character } = ts.getLineAndCharacterOfPosition(sf, node.getStart(sf))
      out.push({
        file: filePath,
        line: line + 1,
        column: character + 1,
        name: node.name.text,
        kind: kindOf(node),
      })
    }
    ts.forEachChild(node, visit)
    return
  }

  ts.forEachChild(sf, visit)
  return out
}
