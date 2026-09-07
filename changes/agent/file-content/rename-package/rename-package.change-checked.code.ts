import { dirname } from "node:path"
import { namingIn, refusalOf } from "@akasha/checks/package-reached-where-named"
import { placedIn } from "@akasha/code/code-specifier"
import { typed } from "@akasha/code/code-typing"
import { calledIn, objectIn } from "@akasha/code/package-manifest"
import { manifestsIn } from "@akasha/indexes/package-reaching"
import { importingOf } from "@akasha/indexes/path-naming"
import { matchingIn } from "@akasha/pages/name-format/format-reaching"
import { lowerKebabCase } from "@akasha/pages/name-format/lower-kebab-case"
import type { Matching } from "@akasha/pages/name-format/name-matching"
import ts from "typescript"
import {
  missing,
  refusing,
  stating,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Replacing, Said } from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const AT = "at"

const TO = "to"

const FROM = "from"

const NAME = "name"

const UNDER = "/"

const AFTER = ":"

const OVER = "@"

const UNRENAMED = "so no package is renamed"

type Splice = { readonly start: number; readonly end: number; readonly said: string }

type Aliased = { readonly opening: string; readonly named: string; readonly range: string }

export type RenamePackageAsked = {
  readonly at: string
  readonly to: string
  readonly from?: string
}

export function nameFor(said: string, was: string, to: string): string | null {
  if (said === was) return to
  if (said.startsWith(`${was}${UNDER}`)) return `${to}${said.slice(was.length)}`
  return null
}

export function aliasIn(said: string): Aliased | null {
  const at = said.indexOf(AFTER)
  if (at < 0) return null
  const held = said.slice(at + 1)
  const last = held.lastIndexOf(OVER)
  if (last <= 0) return null
  return {
    opening: said.slice(0, at + 1),
    named: held.slice(0, last),
    range: held.slice(last),
  }
}

function splicedOver(text: string, found: readonly Splice[]): string {
  let out = ""
  let from = 0
  for (const one of found) {
    out = `${out}${text.slice(from, one.start)}${one.said}`
    from = one.end
  }
  return `${out}${text.slice(from)}`
}

function saidAt(source: ts.JsonSourceFile, node: ts.Node, said: string): Splice {
  return { start: node.getStart(source), end: node.getEnd(), said: JSON.stringify(said) }
}

function overHeld(
  node: ts.Node,
  source: ts.JsonSourceFile,
  was: string,
  to: string,
  found: Splice[]
): undefined {
  if (ts.isObjectLiteralExpression(node)) {
    for (const one of node.properties) {
      if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) continue
      const value = one.initializer
      const alias = ts.isStringLiteral(value) ? aliasIn(value.text) : null
      if (alias !== null && alias.named === to) continue
      if (one.name.text === was) found.push(saidAt(source, one.name, to))
      if (alias === null) {
        overHeld(value, source, was, to, found)
        continue
      }
      if (alias.named === was) {
        found.push(saidAt(source, value, `${alias.opening}${to}${alias.range}`))
      }
    }
    return
  }
  if (ts.isArrayLiteralExpression(node)) {
    for (const one of node.elements) overHeld(one, source, was, to, found)
    return
  }
  if (ts.isStringLiteral(node) && node.text === was) found.push(saidAt(source, node, to))
}

export function spelledAnew(at: string, text: string, was: string, to: string): string {
  const found: Splice[] = []
  for (const one of placedIn(at, text)) {
    const next = nameFor(one.text, was, to)
    if (next === null) continue
    found.push({ start: one.start, end: one.end, said: JSON.stringify(next) })
  }
  return splicedOver(text, found)
}

export function restated(at: string, text: string, was: string, to: string): string {
  const source = ts.parseJsonText(at, text)
  const first = source.statements[0]
  if (first === undefined) return text
  const found: Splice[] = []
  overHeld(first.expression, source, was, to, found)
  return splicedOver(text, found)
}

function matchingFor(world: World): Matching | string {
  try {
    return matchingIn(world.root, world.index)(lowerKebabCase.slug)
  } catch (cause) {
    return cause instanceof Error ? cause.message : String(cause)
  }
}

function reachedIn(at: string, text: string): ReadonlyMap<string, string> {
  const held = namingIn(dirname(at), text)
  const said = held === null ? [] : [...held.reached]
  return new Map(said.map((one) => [one, one]))
}

function manifestsOf(world: World): readonly string[] {
  return manifestsIn(world.index.everyPath(), world.index.fileKeysAt())
}

function namingOld(world: World, was: string): readonly string[] {
  const found: string[] = []
  for (const path of world.index.everyPath()) {
    if (!typed(path)) continue
    const body = world.textOf(path)
    if (body === null || !body.includes(was)) continue
    found.push(path)
  }
  return found
}

function bodiesReaching(
  world: World,
  given: RenamePackageAsked,
  was: string,
  held: readonly string[]
): readonly string[] {
  if (given.from === undefined) return held
  return [...new Set([...held, ...namingOld(world, was)])].sort()
}

function carriedRefusal(given: RenamePackageAsked): string {
  if (given.from === undefined) return `\`${given.to}\` is the name this package carries`
  return `\`${FROM}\` and \`${TO}\` name one package, ${UNRENAMED}`
}

function namedRefusal(given: RenamePackageAsked, matching: Matching): string | null {
  const said = refusalOf(given.to, matching)
  if (said !== null) return said
  return given.from === undefined ? null : refusalOf(given.from, matching)
}

export function renamePackage(world: World, given: RenamePackageAsked): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const held = objectIn(text)
  if (held === null || Array.isArray(held)) {
    return refusing(`\`${given.at}\` reads as no JSON object, ${UNRENAMED}`)
  }
  const was = given.from ?? calledIn(text)
  if (was === null) return refusing(`\`${given.at}\` states no \`${NAME}\`, ${UNRENAMED}`)
  if (was === given.to) return refusing(carriedRefusal(given))
  const matching = matchingFor(world)
  if (typeof matching === "string") return refusing(matching)
  const said = namedRefusal(given, matching)
  if (said !== null) return refusing(`${said}, ${UNRENAMED}`)
  const reading = importingOf(world.index, reachedIn(given.at, text))
  if ("unread" in reading) return refusing(reading.unread)
  const edits: Replacing[] = []
  const own = restated(given.at, text, was, given.to)
  if (own !== text) {
    edits.push({ kind: "replace", path: given.at, contentFrom: text, contentTo: own })
  }
  for (const path of manifestsOf(world)) {
    if (path === given.at) continue
    const body = world.textOf(path)
    if (body === null || !body.includes(was)) continue
    const next = restated(path, body, was, given.to)
    if (next !== body) edits.push({ kind: "replace", path, contentFrom: body, contentTo: next })
  }
  for (const path of bodiesReaching(world, given, was, reading.importers)) {
    const body = world.textOf(path)
    if (body === null) return refusing(`\`${path}\` reaches this package and could not be read`)
    const next = spelledAnew(path, body, was, given.to)
    if (next !== body) edits.push({ kind: "replace", path, contentFrom: body, contentTo: next })
  }
  if (given.from !== undefined && edits.length === 0) {
    return refusing(`nothing names \`${given.from}\`, ${UNRENAMED}`)
  }
  return stating(edits)
}

export type Asked = Readonly<Record<string, string>>

export function runChange(world: World, given: Asked): Said {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return renamePackage(world, { at, to, from: given[FROM] })
}
