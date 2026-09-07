import { literalOf, parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import {
  answered,
  refusing,
  writing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

export function keyOf(held: ts.PropertyAssignment): string | null {
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

export function literalIn(source: ts.SourceFile): ts.ObjectLiteralExpression | null {
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement) || !exported(statement)) continue
    for (const one of statement.declarationList.declarations) {
      if (one.initializer === undefined) continue
      const held = literalOf(one.initializer)
      if (held !== null) return held
    }
  }
  return null
}

export function statedIn(source: ts.SourceFile): ReadonlyMap<string, ts.StringLiteral> {
  const held = literalIn(source)
  return held === null ? new Map() : textsOf(held)
}

export function restated(path: string, text: string, key: string, to: string): Answer {
  const source = parsedAs(path, text)
  const held = statedIn(source).get(key)
  if (held === undefined) return refusing(`\`${path}\` states no text under \`${key}\``)
  if (held.text === to) return refusing(`\`${to}\` is what \`${key}\` states already`)
  const start = held.getStart(source)
  const body = text.slice(0, start) + JSON.stringify(to) + text.slice(held.getEnd())
  return answered([writing(path, text, body)])
}

export type Given = {
  readonly at: string
  readonly key: string
  readonly to: string
}

export function runChange(world: World, given: Given): Answer {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` holds no body, so nothing is restated`)
  return restated(given.at, text, given.key, given.to)
}
