import { dirname, join } from "node:path"
import ts from "typescript"
import {
  refusing,
  splicing,
  stating,
} from "../../../../modules/answer/change-answer.module.code.ts"
import type { Said, Splice } from "../../../../modules/answer/change-answer.module.types.ts"
import { goneSpan } from "../../../../modules/json-entries/json-entries.module.code.ts"
import type { World } from "../../../../modules/shadow/change-shadow.module.code.ts"

const EXPORTS = "exports"

const HERE = "."

const PARTED_BY = "/"

const OPENING = "./"

type Landing = { readonly said: string } | { readonly gone: true }

export type Asked = {
  readonly at: string
  readonly moved: Readonly<Record<string, string>>
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

export function landingFor(
  at: string,
  arriving: string,
  value: string,
  moved: ReadonlyMap<string, string>
): Landing {
  const was = join(dirname(at), value)
  const arrived = moved.get(was) ?? was
  const under = arriving === HERE ? "" : `${arriving}${PARTED_BY}`
  if (!arrived.startsWith(under)) return { gone: true }
  return { said: `${OPENING}${arrived.slice(under.length)}` }
}

function saidSpan(source: ts.JsonSourceFile, value: ts.StringLiteral, said: string): Splice | null {
  if (said === value.text) return null
  return { from: value.getStart(source), to: value.getEnd(), put: JSON.stringify(said) }
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

export function renameManifestWays(given: Asked, textOf: (path: string) => string | null): Said {
  const text = textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` holds no body, so no way in is repointed`)
  let read: unknown = null
  try {
    read = JSON.parse(text)
  } catch {
    read = null
  }
  if (read === null || typeof read !== "object" || Array.isArray(read)) {
    return refusing(`\`${given.at}\` reads as no JSON object, so no way in is repointed`)
  }
  const moved = new Map(Object.entries(given.moved))
  const lands = moved.get(given.at) ?? given.at
  const source = ts.parseJsonText(given.at, text)
  const edits = splicing(lands, text, splicesFor(source, text, given.at, dirname(lands), moved))
  const one =
    lands === given.at
      ? edits
      : [{ kind: "move" as const, pathFrom: given.at, pathTo: lands }, ...edits]
  return stating(one)
}

export function runChange(world: World, given: Asked): Said {
  return renameManifestWays(given, world.textOf)
}
