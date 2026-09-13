import ts from "typescript"

function literalOf(held: ts.TypeNode): ts.TypeLiteralNode | null {
  if (ts.isTypeLiteralNode(held)) return held
  if (!ts.isIntersectionTypeNode(held)) return null
  for (const one of held.types) {
    const found = literalOf(one)
    if (found !== null) return found
  }
  return null
}

export function aliasIn(source: ts.SourceFile, named: string): ts.TypeLiteralNode | null {
  for (const one of source.statements) {
    if (ts.isTypeAliasDeclaration(one) && one.name.text === named) return literalOf(one.type)
  }
  return null
}
