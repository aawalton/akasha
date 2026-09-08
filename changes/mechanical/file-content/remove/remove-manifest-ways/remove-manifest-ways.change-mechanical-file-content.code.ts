import { dirname } from "node:path"
import ts from "typescript"
import {
  refusing,
  splicing,
  stating,
} from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Said, Splice } from "../../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"

const EXPORTS = "exports"

const HERE = "."

const PARTED_BY = "/"

const OPENING = "./"

export type Asked = {
  readonly at: string
  readonly going: readonly string[]
}

function readsAsObject(text: string): boolean {
  let read: unknown
  try {
    read = JSON.parse(text)
  } catch {
    return false
  }
  return read !== null && typeof read === "object" && !Array.isArray(read)
}

export function objectAt(
  source: ts.JsonSourceFile,
  key: string
): ts.ObjectLiteralExpression | null {
  const first = source.statements[0]
  if (first === undefined || !ts.isExpressionStatement(first)) return null
  const held = first.expression
  if (!ts.isObjectLiteralExpression(held)) return null
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) continue
    if (one.name.text !== key) continue
    return ts.isObjectLiteralExpression(one.initializer) ? one.initializer : null
  }
  return null
}

export function goneSpan(text: string, node: ts.Node, after: boolean): Splice {
  const from = node.getFullStart()
  const to = node.getEnd()
  let at = to
  while (at < text.length) {
    const here = text[at] ?? ""
    if (here === ",") return { from, to: at + 1, put: "" }
    if (here.trim() !== "") break
    at = at + 1
  }
  if (after) return { from, to, put: "" }
  let back = from - 1
  while (back >= 0) {
    const here = text[back] ?? ""
    if (here === ",") return { from: back, to, put: "" }
    if (here.trim() !== "") break
    back = back - 1
  }
  return { from, to, put: "" }
}

export function landsOn(at: string, value: string): string {
  const folder = dirname(at)
  const said = value.startsWith(OPENING) ? value.slice(OPENING.length) : value
  return folder === HERE ? said : `${folder}${PARTED_BY}${said}`
}

export function waysGoneIn(
  at: string,
  text: string,
  going: ReadonlySet<string>
): readonly string[] {
  const held = objectAt(ts.parseJsonText(at, text), EXPORTS)
  if (held === null) return []
  const found: string[] = []
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) continue
    const value = one.initializer
    if (!ts.isStringLiteral(value)) continue
    if (going.has(landsOn(at, value.text))) found.push(one.name.text)
  }
  return found
}

export function waysGoingIn(
  at: string,
  text: string,
  dropping: ReadonlySet<string>
): readonly Splice[] {
  return entriesGoingIn(at, text, EXPORTS, dropping)
}

export function entriesGoingIn(
  at: string,
  text: string,
  holding: string,
  dropping: ReadonlySet<string>
): readonly Splice[] {
  const held = objectAt(ts.parseJsonText(at, text), holding)
  if (held === null) return []
  const spans: Splice[] = []
  let after = false
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) {
      after = false
      continue
    }
    if (!dropping.has(one.name.text)) {
      after = false
      continue
    }
    spans.push(goneSpan(text, one, after))
    after = true
  }
  return spans
}

export function removeManifestWays(given: Asked, textOf: (path: string) => string | null): Said {
  const text = textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` holds no body, so no way in is dropped`)
  if (!readsAsObject(text)) {
    return refusing(`\`${given.at}\` reads as no JSON object, so no way in is dropped`)
  }
  const ways = waysGoneIn(given.at, text, new Set(given.going))
  if (ways.length === 0) return stating([])
  return stating(splicing(given.at, text, waysGoingIn(given.at, text, new Set(ways))))
}

export function runChange(world: World, given: Asked): Said {
  return removeManifestWays(given, world.textOf)
}
