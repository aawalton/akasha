import { literalOf, parsedAs } from "@akasha/code-system/code-source"
import ts from "typescript"

export type Restated = {
  readonly body: string | null
  readonly refused: string | null
}

function refusing(why: string): Restated {
  return { body: null, refused: why }
}

function keyOf(held: ts.PropertyAssignment): string | null {
  const name = held.name
  return ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : null
}

function exported(statement: ts.VariableStatement): boolean {
  return statement.modifiers?.some((one) => one.kind === ts.SyntaxKind.ExportKeyword) === true
}

function textsOf(held: ts.ObjectLiteralExpression): ReadonlyMap<string, ts.StringLiteral> {
  const found = new Map<string, ts.StringLiteral>()
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one)) continue
    const key = keyOf(one)
    if (key === null || !ts.isStringLiteral(one.initializer)) continue
    found.set(key, one.initializer)
  }
  return found
}

export function statedIn(source: ts.SourceFile): ReadonlyMap<string, ts.StringLiteral> {
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement) || !exported(statement)) continue
    for (const one of statement.declarationList.declarations) {
      if (one.initializer === undefined) continue
      const held = literalOf(one.initializer)
      if (held !== null) return textsOf(held)
    }
  }
  return new Map()
}

export function restated(path: string, text: string, key: string, to: string): Restated {
  const source = parsedAs(path, text)
  const held = statedIn(source).get(key)
  if (held === undefined) return refusing(`\`${path}\` states no text under \`${key}\``)
  if (held.text === to) return refusing(`\`${to}\` is what \`${key}\` states already`)
  const start = held.getStart(source)
  const body = text.slice(0, start) + JSON.stringify(to) + text.slice(held.getEnd())
  return { body, refused: null }
}
