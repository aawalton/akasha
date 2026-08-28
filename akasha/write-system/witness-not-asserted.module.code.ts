import ts from "typescript"

export function witnessTypesIn(path: string, text: string): readonly string[] {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)

  const hidden = new Set<string>()
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    const exported = statement.modifiers?.some((one) => one.kind === ts.SyntaxKind.ExportKeyword)
    if (exported === true) continue
    for (const one of statement.declarationList.declarations) {
      const held = one.type
      if (held === undefined || !ts.isTypeOperatorNode(held)) continue
      if (held.operator !== ts.SyntaxKind.UniqueKeyword) continue
      if (ts.isIdentifier(one.name)) hidden.add(one.name.text)
    }
  }
  if (hidden.size === 0) return []

  const found: string[] = []
  for (const statement of source.statements) {
    if (!ts.isTypeAliasDeclaration(statement)) continue
    let marked = false
    const visit = (node: ts.Node): void => {
      if (ts.isPropertySignature(node) && ts.isComputedPropertyName(node.name)) {
        const key = node.name.expression
        if (ts.isIdentifier(key) && hidden.has(key.text)) marked = true
      }
      ts.forEachChild(node, visit)
    }
    ts.forEachChild(statement, visit)
    if (marked) found.push(statement.name.text)
  }
  return found
}

function assertedTo(node: ts.TypeNode): string | null {
  if (!ts.isTypeReferenceNode(node)) return null
  const named = node.typeName
  return ts.isIdentifier(named) ? named.text : null
}

export function assertionRefusals(
  path: string,
  text: string,
  witnessTypes: ReadonlyMap<string, string>
): readonly string[] {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const said: string[] = []
  const visit = (node: ts.Node): void => {
    if (ts.isAsExpression(node) || ts.isTypeAssertionExpression(node)) {
      const named = assertedTo(node.type)
      const declaredIn = named === null ? undefined : witnessTypes.get(named)
      if (named !== null && declaredIn !== undefined && declaredIn !== path) {
        const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1
        said.push(
          `${path}: line ${line} asserts to \`${named}\`, which ${declaredIn} declares as a ` +
            "witness — a witness is obtained from the module that declares it or not at all"
        )
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
  return said
}
