import ts from "typescript"
import { literalOf, parsedAs } from "../../../../code-system/code-source/code-source.module.code.ts"
import {
  everyOfTypeAnswered,
  everyPathAnswered,
  standingAt,
} from "../../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { exportedAs } from "../../../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { namedIn } from "../../../../pages-system/page/page-file-name/page-file-name.module.code.ts"

const PAGE_TYPE = "page-type"

const KEBAB = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/

export type Renaming = {
  readonly id: string
  readonly path: string
  readonly was: string
  readonly now: string
  readonly plural: string
}

export type Asked = { readonly renaming: Renaming } | { readonly refused: string }

export type Carry = {
  readonly from: string
  readonly to: string
}

function kebabOff(said: string, named: string): string | null {
  if (said === "") return `${named} takes a slug, and none was said`
  return KEBAB.test(said)
    ? null
    : `\`${said}\` is no slug — ${named} is written in lower kebab case`
}

export function renamingFor(
  given: Parameters<typeof standingAt>[0],
  from: string,
  to: string,
  plural: string
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
  const standing = standingAt(given, PAGE_TYPE, from)
  const one = standing[0]
  if (one === undefined) return { refused: `no page type carries the slug \`${from}\`` }
  if (standing.length > 1) {
    return {
      refused: `\`${from}\` is carried by ${standing.length} page types, so this names more than one`,
    }
  }
  if (standingAt(given, PAGE_TYPE, to).length > 0) {
    return { refused: `a page type already carries the slug \`${to}\`` }
  }
  return { renaming: { id: one.id, path: one.path, was: from, now: to, plural } }
}

export type Spot = { readonly start: number; readonly end: number }

export type Stated = {
  readonly name: Spot
  readonly keyed: ReadonlyMap<string, Spot>
}

function keyedIn(
  source: ts.SourceFile,
  held: ts.ObjectLiteralExpression,
  keys: ReadonlySet<string>
): ReadonlyMap<string, Spot> {
  const found = new Map<string, Spot>()
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one)) continue
    const key = ts.isIdentifier(one.name) || ts.isStringLiteral(one.name) ? one.name.text : null
    if (key === null || !keys.has(key) || !ts.isStringLiteral(one.initializer)) continue
    found.set(key, { start: one.initializer.getStart(source), end: one.initializer.getEnd() })
  }
  return found
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
      return {
        name: { start: one.name.getStart(source), end: one.name.getEnd() },
        keyed: keyedIn(source, held, wanted),
      }
    }
  }
  return null
}

function splicedIn(text: string, said: readonly (readonly [Spot, string])[]): string {
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
  const said = namedIn(path)
  if (said === null || said.tail !== one.was) return null
  const cut = path.lastIndexOf(`${said.stem}.${said.tail}.`)
  if (cut < 0) return null
  const after = path.slice(cut + `${said.stem}.${said.tail}.`.length)
  return `${path.slice(0, cut)}${said.stem}.${one.now}.${after}`
}

function dirOf(path: string): string {
  const cut = path.lastIndexOf("/")
  return cut < 0 ? "" : path.slice(0, cut)
}

export function typePageRenamed(one: Renaming): Carry {
  const cut = one.path.lastIndexOf("/")
  const dir = cut < 0 ? "" : one.path.slice(0, cut)
  const named = `${one.now}.${PAGE_TYPE}.ts`
  const held = dir.endsWith(`/${one.was}`) ? `${dir.slice(0, -one.was.length)}${one.now}` : dir
  return { from: one.path, to: held === "" ? named : `${held}/${named}` }
}

export function carriesFor(
  root: string,
  one: Renaming,
  standing: (path: string) => boolean
): readonly Carry[] {
  const found = new Map<string, string>()
  const type = typePageRenamed(one)
  found.set(type.from, type.to)
  const under = `${dirOf(one.path)}/`
  const moved = `${dirOf(type.to)}/`
  for (const path of everyPathAnswered(root)) {
    if (path === one.path || !standing(path)) continue
    const tailed = tailRenamed(path, one)
    const held = tailed ?? path
    if (under !== moved && held.startsWith(under)) {
      found.set(path, `${moved}${held.slice(under.length)}`)
      continue
    }
    if (tailed !== null) found.set(path, tailed)
  }
  return [...found]
    .filter(([from, to]) => from !== to)
    .map(([from, to]) => ({ from, to }))
    .sort((a, b) => (a.from < b.from ? -1 : 1))
}

export function pagesOf(root: string, one: Renaming): readonly string[] {
  return [...new Set(everyOfTypeAnswered(root, one.was).map((held) => held.path))].sort()
}
