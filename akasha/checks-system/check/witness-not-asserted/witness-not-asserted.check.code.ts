import ts from "typescript"
import type { Judged } from "../../../checks-system/judging.module.code.ts"
import type { Whole } from "../../checking.module.code.ts"
import { textIn } from "../../checking.module.code.ts"

const TS = ".ts"

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

export function assertionFindings(
  path: string,
  text: string,
  witnessTypes: ReadonlyMap<string, string>,
  named: (at: string) => string
): readonly Judged[] {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const said: Judged[] = []
  const visit = (node: ts.Node): void => {
    if (ts.isAsExpression(node) || ts.isTypeAssertionExpression(node)) {
      const held = assertedTo(node.type)
      const declaredIn = held === null ? undefined : witnessTypes.get(held)
      if (held !== null && declaredIn !== undefined && declaredIn !== path) {
        const line = source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1
        said.push({
          path,
          reason:
            `line ${line} asserts to \`${held}\`, which ${named(declaredIn)} declares as a ` +
            "witness — a witness is obtained from the module that declares it or not at all",
        })
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
  return said
}

export function witnessNotAsserted(given: Whole): readonly Judged[] {
  const named = (at: string): string =>
    at.startsWith(`${given.root}/`) ? at.slice(given.root.length + 1) : at
  const bodies = new Map<string, string>()
  for (const path of given.paths) {
    if (!path.endsWith(TS)) continue
    const text = textIn(given, path)
    if (text !== null) bodies.set(path, text)
  }
  const witnessTypes = new Map<string, string>()
  for (const [path, text] of bodies) {
    for (const one of witnessTypesIn(path, text)) witnessTypes.set(one, path)
  }
  if (witnessTypes.size === 0) return []
  const said: Judged[] = []
  for (const [path, text] of bodies) {
    said.push(...assertionFindings(path, text, witnessTypes, named))
  }
  return said
}
