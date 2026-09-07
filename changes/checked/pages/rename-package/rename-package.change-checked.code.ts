import { dirname } from "node:path"
import { placedIn } from "@akasha/code/code-specifier"
import { manifestsIn } from "@akasha/indexes/package-reaching"
import { matchingIn } from "@akasha/pages/name-format/format-reaching"
import { lowerKebabCase } from "@akasha/pages/name-format/lower-kebab-case"
import type { Matching } from "@akasha/pages/name-format/name-matching"
import ts from "typescript"
import {
  manifestIn,
  nameIn,
  namingIn,
  refusalOf,
} from "../../../../checks/code-checks/pages/package-reached-where-named/package-reached-where-named.code-check.code.ts"
import { importingOf } from "../../../../pages/indexes/path-naming/path-naming.module.code.ts"
import {
  answered,
  missing,
  refusing,
  writing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer, Edit } from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const AT = "at"

const TO = "to"

const NAME = "name"

const UNDER = "/"

const AFTER = ":"

const OVER = "@"

type Splice = { readonly start: number; readonly end: number; readonly said: string }

type Aliased = { readonly opening: string; readonly named: string; readonly range: string }

export type RenamePackageAsked = {
  readonly at: string
  readonly to: string
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

export function respelled(at: string, text: string, was: string, to: string): string {
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

export function renamePackage(world: World, given: RenamePackageAsked): Answer {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const held = manifestIn(text)
  if (held === null || Array.isArray(held)) {
    return refusing(`\`${given.at}\` reads as no JSON object, so no package is renamed`)
  }
  const was = nameIn(text)
  if (was === null) {
    return refusing(`\`${given.at}\` states no \`${NAME}\`, so no package is renamed`)
  }
  if (was === given.to) return refusing(`\`${given.to}\` is the name this package carries`)
  const matching = matchingFor(world)
  if (typeof matching === "string") return refusing(matching)
  const said = refusalOf(given.to, matching)
  if (said !== null) return refusing(`${said}, so no package is renamed`)
  const reading = importingOf(world.index, reachedIn(given.at, text))
  if ("unread" in reading) return refusing(reading.unread)
  const edits: Edit[] = [writing(given.at, text, restated(given.at, text, was, given.to))]
  for (const path of manifestsOf(world)) {
    if (path === given.at) continue
    const body = world.textOf(path)
    if (body === null || !body.includes(was)) continue
    const next = restated(path, body, was, given.to)
    if (next !== body) edits.push(writing(path, body, next))
  }
  for (const path of reading.importers) {
    const body = world.textOf(path)
    if (body === null) return refusing(`\`${path}\` reaches this package and could not be read`)
    const next = respelled(path, body, was, given.to)
    if (next !== body) edits.push(writing(path, body, next))
  }
  return answered(edits)
}

export type Asked = Readonly<Record<string, string>>

export function runChange(world: World, given: Asked): Answer {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return renamePackage(world, { at, to })
}
