import { dirname } from "node:path"
import { namingIn, refusalOf } from "@akasha/checks/package-reached-where-named"
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
  splicing,
  stating,
} from "../../../modules/answer/change-answer.module.code.ts"
import type {
  FileChange,
  Said,
  Splice,
} from "../../../modules/answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { aliasIn, spelledAnew } from "../../../modules/package-naming/package-naming.module.code.ts"

const AT = "at"

const TO = "to"

const FROM = "from"

const NAME = "name"

const UNRENAMED = "so no package is renamed"

export type RenamePackageAsked = {
  readonly at: string
  readonly to: string
  readonly from?: string
}

function saidAt(source: ts.JsonSourceFile, node: ts.Node, said: string): Splice {
  return { from: node.getStart(source), to: node.getEnd(), put: JSON.stringify(said) }
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

export function restated(at: string, text: string, was: string, to: string): readonly Splice[] {
  const source = ts.parseJsonText(at, text)
  const first = source.statements[0]
  if (first === undefined) return []
  const found: Splice[] = []
  overHeld(first.expression, source, was, to, found)
  return found
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
  const edits: FileChange[] = []
  edits.push(...splicing(given.at, text, restated(given.at, text, was, given.to)))
  for (const path of manifestsOf(world)) {
    if (path === given.at) continue
    const body = world.textOf(path)
    if (body === null || !body.includes(was)) continue
    edits.push(...splicing(path, body, restated(path, body, was, given.to)))
  }
  for (const path of bodiesReaching(world, given, was, reading.importers)) {
    const body = world.textOf(path)
    if (body === null) return refusing(`\`${path}\` reaches this package and could not be read`)
    edits.push(...splicing(path, body, spelledAnew(path, body, was, given.to)))
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
