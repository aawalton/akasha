import { literalOf, parsedAs } from "@akasha/code-system/code-source"
import { everyOfType, everyPath, listedAt } from "@akasha/indexes"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import ts from "typescript"

const PAGE_TYPE = "page-type"

const PLURAL = "pluralSlug"

const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/

export type Renaming = {
  readonly id: string
  readonly path: string
  readonly was: string
  readonly now: string
  readonly wasPlural: string
  readonly plural: string
}

export type Asked = { readonly renaming: Renaming } | { readonly refused: string }

export type Carry = {
  readonly from: string
  readonly to: string
}

export function kebabOff(said: string, named: string): string | null {
  if (said === "") return `${named} takes a slug, and none was said`
  return KEBAB.test(said)
    ? null
    : `\`${said}\` is no slug — ${named} is written in lower kebab case`
}

export function renamingFor(
  given: Parameters<typeof listedAt>[0],
  from: string,
  to: string,
  plural: string,
  textOf: (path: string) => string | null
): Asked {
  for (const [said, named] of [
    [from, "the slug renamed"],
    [to, "the slug it becomes"],
    [plural, "the plural it becomes"],
  ] as const) {
    const why = kebabOff(said, named)
    if (why !== null) return { refused: why }
  }
  if (from === PAGE_TYPE) {
    return {
      refused:
        "`page-type` is the tail of every page type's own file and the scope every page type's " +
        "slug is unique within, so renaming it would leave nothing able to read the rename",
    }
  }
  if (from === to) {
    return { refused: `\`${from}\` is already what it would become, so there is nothing to rename` }
  }
  const listed = listedAt(given, PAGE_TYPE, from)
  const one = listed[0]
  if (one === undefined) return { refused: `no page type carries the slug \`${from}\`` }
  if (listed.length > 1) {
    return {
      refused: `\`${from}\` is carried by ${listed.length} page types, so this names more than one`,
    }
  }
  if (listedAt(given, PAGE_TYPE, to).length > 0) {
    return { refused: `a page type already carries the slug \`${to}\`` }
  }
  const text = textOf(one.path)
  if (text === null) {
    return { refused: `${one.path} carries the slug \`${from}\` and its body could not be read` }
  }
  const wasPlural = statedAs(one.path, text, PLURAL)
  if (wasPlural === null) {
    return {
      refused: `${one.path} states no \`${PLURAL}\`, so the folder holding its pages is unnamed`,
    }
  }
  return { renaming: { id: one.id, path: one.path, was: from, now: to, wasPlural, plural } }
}

export type Spot = { readonly start: number; readonly end: number }

export type Stated = {
  readonly name: Spot
  readonly keyed: ReadonlyMap<string, Spot>
  readonly said: ReadonlyMap<string, string>
}

type Keyed = {
  readonly keyed: Map<string, Spot>
  readonly said: Map<string, string>
}

function keyedIn(
  source: ts.SourceFile,
  held: ts.ObjectLiteralExpression,
  keys: ReadonlySet<string>
): Keyed {
  const keyed = new Map<string, Spot>()
  const said = new Map<string, string>()
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one)) continue
    const key = ts.isIdentifier(one.name) || ts.isStringLiteral(one.name) ? one.name.text : null
    if (key === null || !keys.has(key) || !ts.isStringLiteral(one.initializer)) continue
    keyed.set(key, { start: one.initializer.getStart(source), end: one.initializer.getEnd() })
    said.set(key, one.initializer.text)
  }
  return { keyed, said }
}

export function statedIn(path: string, text: string, keys: readonly string[]): Stated | null {
  const wanted = new Set(keys)
  const source = parsedAs(path, text)
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const one of statement.declarationList.declarations) {
      if (one.initializer === undefined || !ts.isIdentifier(one.name)) continue
      const held = literalOf(one.initializer)
      if (held === null) continue
      const found = keyedIn(source, held, wanted)
      return {
        name: { start: one.name.getStart(source), end: one.name.getEnd() },
        keyed: found.keyed,
        said: found.said,
      }
    }
  }
  return null
}

export function statedAs(path: string, text: string, key: string): string | null {
  return statedIn(path, text, [key])?.said.get(key) ?? null
}

export function splicedIn(text: string, said: readonly (readonly [Spot, string])[]): string {
  let out = ""
  let at = 0
  for (const [spot, held] of [...said].sort((one, two) => one[0].start - two[0].start)) {
    out = `${out}${text.slice(at, spot.start)}${held}`
    at = spot.end
  }
  return `${out}${text.slice(at)}`
}

export function restated(
  path: string,
  text: string,
  said: ReadonlyMap<string, string>,
  name: string | null = null
): string | null {
  const stated = statedIn(path, text, [...said.keys()])
  if (stated === null) return null
  const spliced: (readonly [Spot, string])[] = []
  if (name !== null) spliced.push([stated.name, exportedAs(name)])
  for (const [key, spot] of stated.keyed) {
    const held = said.get(key)
    if (held !== undefined) spliced.push([spot, JSON.stringify(held)])
  }
  return spliced.length === 0 ? text : splicedIn(text, spliced)
}

export function tailRenamed(path: string, one: Renaming): string | null {
  const cut = path.lastIndexOf("/")
  const name = cut < 0 ? path : path.slice(cut + 1)
  const parts = name.split(".")
  if (parts.length < 3 || parts[1] !== one.was) return null
  const held = [parts[0], one.now, ...parts.slice(2)].join(".")
  return `${path.slice(0, cut + 1)}${held}`
}

function dirOf(path: string): string {
  const cut = path.lastIndexOf("/")
  return cut < 0 ? "" : path.slice(0, cut)
}

export function typePageRenamed(one: Renaming): Carry {
  const dir = dirOf(one.path)
  const named = `${one.now}.${PAGE_TYPE}.ts`
  const held = dir.endsWith(`/${one.was}`) ? `${dir.slice(0, -one.was.length)}${one.now}` : dir
  return { from: one.path, to: held === "" ? named : `${held}/${named}` }
}

export function relocated(path: string, one: Renaming, under: string, moved: string): string {
  if (!path.startsWith(under)) return path
  const rest = path.slice(under.length)
  const said = `${one.wasPlural}/`
  if (one.wasPlural !== one.plural && rest.startsWith(said)) {
    return `${moved}${one.plural}/${rest.slice(said.length)}`
  }
  return `${moved}${rest}`
}

export function carriesFor(
  root: string,
  one: Renaming,
  standing: (path: string) => boolean
): readonly Carry[] {
  const type = typePageRenamed(one)
  const found = new Map<string, string>([[type.from, type.to]])
  const under = `${dirOf(one.path)}/`
  const moved = `${dirOf(type.to)}/`
  for (const path of everyPath(root)) {
    if (path === one.path || !standing(path)) continue
    const there = relocated(tailRenamed(path, one) ?? path, one, under, moved)
    if (there !== path) found.set(path, there)
  }
  return [...found]
    .filter(([from, to]) => from !== to)
    .map(([from, to]) => ({ from, to }))
    .sort((a, b) => (a.from < b.from ? -1 : 1))
}

export function pagesOf(root: string, one: Renaming): readonly string[] {
  return [...new Set(everyOfType(root, one.was).map((held) => held.path))].sort()
}
