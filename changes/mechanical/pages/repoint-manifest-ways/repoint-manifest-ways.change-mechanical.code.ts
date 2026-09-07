import { dirname, join } from "node:path"
import ts from "typescript"
import {
  answered,
  moving,
  refusing,
  writing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const EXPORTS = "exports"

const HERE = "."

const PARTED_BY = "/"

const OPENING = "./"

type Splice = { readonly start: number; readonly end: number; readonly said: string }

type Landing = { readonly said: string } | { readonly gone: true }

export type Asked = {
  readonly at: string
  readonly moved: Readonly<Record<string, string>>
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

function heldIn(source: ts.JsonSourceFile): ts.ObjectLiteralExpression | null {
  const first = source.statements[0]
  if (first === undefined || !ts.isExpressionStatement(first)) return null
  const held = first.expression
  return ts.isObjectLiteralExpression(held) ? held : null
}

function namedIn(owner: ts.ObjectLiteralExpression, key: string): ts.PropertyAssignment | null {
  for (const one of owner.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) continue
    if (one.name.text === key) return one
  }
  return null
}

function goneSpan(text: string, node: ts.Node, after: boolean): Splice {
  const start = node.getFullStart()
  const end = node.getEnd()
  let at = end
  while (at < text.length) {
    const here = text[at] ?? ""
    if (here === ",") return { start, end: at + 1, said: "" }
    if (here.trim() !== "") break
    at = at + 1
  }
  if (after) return { start, end, said: "" }
  let back = start - 1
  while (back >= 0) {
    const here = text[back] ?? ""
    if (here === ",") return { start: back, end, said: "" }
    if (here.trim() !== "") break
    back = back - 1
  }
  return { start, end, said: "" }
}

export function landingFor(
  at: string,
  arriving: string,
  value: string,
  moved: ReadonlyMap<string, string>
): Landing {
  const was = join(dirname(at), value)
  const arrived = moved.get(was) ?? was
  const under = arriving === HERE ? "" : `${arriving}${PARTED_BY}`
  if (arrived.startsWith(under)) return { gone: true }
  return { said: `${OPENING}${arrived.slice(under.length)}` }
}

function saidSpan(source: ts.JsonSourceFile, value: ts.StringLiteral, said: string): Splice | null {
  if (said === value.text) return null
  return { start: value.getStart(source), end: value.getEnd(), said: JSON.stringify(said) }
}

function overWays(
  source: ts.JsonSourceFile,
  text: string,
  at: string,
  arriving: string,
  held: ts.ObjectLiteralExpression,
  moved: ReadonlyMap<string, string>
): readonly Splice[] {
  const found: Splice[] = []
  let after = false
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) {
      after = false
      continue
    }
    const value = one.initializer
    if (!ts.isStringLiteral(value)) {
      after = false
      continue
    }
    const landing = landingFor(at, arriving, value.text, moved)
    if ("gone" in landing) {
      found.push(goneSpan(text, one, after))
      after = true
      continue
    }
    const next = saidSpan(source, value, landing.said)
    if (next !== null) found.push(next)
    after = false
  }
  return found
}

function splicesFor(
  source: ts.JsonSourceFile,
  text: string,
  at: string,
  arriving: string,
  moved: ReadonlyMap<string, string>
): readonly Splice[] {
  const owner = heldIn(source)
  const ways = owner === null ? null : namedIn(owner, EXPORTS)
  if (ways === null) return []
  const held = ways.initializer
  if (ts.isObjectLiteralExpression(held)) return overWays(source, text, at, arriving, held, moved)
  if (!ts.isStringLiteral(held)) return []
  const landing = landingFor(at, arriving, held.text, moved)
  if ("gone" in landing) return [goneSpan(text, ways, false)]
  const next = saidSpan(source, held, landing.said)
  return next === null ? [] : [next]
}

function spliced(text: string, splices: readonly Splice[]): string {
  let body = text
  for (const one of [...splices].sort((first, next) => next.start - first.start)) {
    body = `${body.slice(0, one.start)}${one.said}${body.slice(one.end)}`
  }
  return body
}

export function repointManifestWays(given: Asked, textOf: (path: string) => string | null): Answer {
  const text = textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` holds no body, so no way in is repointed`)
  if (!readsAsObject(text)) {
    return refusing(`\`${given.at}\` reads as no JSON object, so no way in is repointed`)
  }
  const moved = new Map(Object.entries(given.moved))
  const lands = moved.get(given.at) ?? given.at
  const source = ts.parseJsonText(given.at, text)
  const body = spliced(text, splicesFor(source, text, given.at, dirname(lands), moved))
  return answered([
    lands === given.at ? writing(given.at, text, body) : moving(given.at, lands, text, body),
  ])
}

export function runChange(world: World, given: Asked): Answer {
  return repointManifestWays(given, world.textOf)
}
