import { parsedAs } from "@akasha/code-system/code-source"
import type { Typing } from "@akasha/code-system/code-typing"
import { boundAs, exportsNamed, referencesOf } from "@akasha/code-system/code-typing"
import { everyOfType, namersOf, readingIn } from "@akasha/indexes"
import { knownIn, namesIn, namingsIn, reaches, type Shaped } from "@akasha/indexes/reaching"
import { addressIn } from "@akasha/pages-system/page-address"
import { exportedAs, typedAs } from "@akasha/pages-system/page-export-name"
import type { Value } from "@akasha/pages-system/page-value"
import { valuesOver } from "@akasha/pages-system/page-value"
import ts from "typescript"
import type { Renaming, Spot } from "../type-renaming/type-renaming.module.code.ts"
import { splicedIn } from "../type-renaming/type-renaming.module.code.ts"

export type Addressed = {
  readonly key: string
  readonly named: string
}

export function addressedIn(value: Value, known: Shaped, id: string): readonly Addressed[] {
  const found: Addressed[] = []
  const seen = new Set<string>()
  for (const one of namingsIn(value, known)) {
    if (one.own) continue
    const wanted = known.targetOf(one.propertySlug)
    if (wanted === null) continue
    for (const named of namesIn(one.held)) {
      const reached = reaches(named, wanted, known)
      if ("refused" in reached || reached.id !== id || seen.has(`${one.key} ${named}`)) continue
      seen.add(`${one.key} ${named}`)
      found.push({ key: one.key, named })
    }
  }
  return found
}

export function readdressed(named: string, one: Renaming, type: boolean): string | null {
  const address = addressIn(named)
  if (address.kind === "id") return null
  if (address.kind === "bare") return type ? one.now : null
  if (type) return `${address.pageTypeSlug}/${one.now}`
  return address.pageTypeSlug === one.was ? `${one.now}/${address.slug}` : null
}

export type Spelled = {
  readonly said: ReadonlyMap<string, string>
  readonly keys: ReadonlySet<string>
}

export type Spelling = ReadonlyMap<string, Spelled>

type Held = { readonly said: Map<string, string>; readonly keys: Set<string> }

export function spellingOver(
  root: string,
  one: Renaming,
  textOf: (path: string) => string | null
): Spelling {
  const loadedAt = valuesOver(textOf)
  const known = knownIn(readingIn(root), loadedAt)
  const found = new Map<string, Held>()
  const take = (id: string, type: boolean): undefined => {
    for (const path of new Set(namersOf(root, id).map((named) => named.path))) {
      const value = loadedAt(path)
      if (value === null) continue
      for (const held of addressedIn(value, known, id)) {
        const next = readdressed(held.named, one, type)
        if (next === null || next === held.named) continue
        const at = found.get(path) ?? { said: new Map(), keys: new Set() }
        at.said.set(held.named, next)
        at.keys.add(held.key)
        found.set(path, at)
      }
    }
  }
  take(one.id, true)
  for (const held of everyOfType(root, one.was)) take(held.id, false)
  return found
}

export function respelled(
  path: string,
  text: string,
  said: ReadonlyMap<string, string>,
  keys: ReadonlySet<string>
): string {
  if (said.size === 0) return text
  const source = parsedAs(path, text)
  const spots: (readonly [Spot, string])[] = []
  const walk = (node: ts.Node, inside: boolean): undefined => {
    let held = inside
    if (ts.isPropertyAssignment(node)) {
      const key =
        ts.isIdentifier(node.name) || ts.isStringLiteral(node.name) ? node.name.text : null
      held = key !== null && keys.has(key)
    }
    if (held && ts.isStringLiteral(node)) {
      const next = said.get(node.text)
      if (next !== undefined) {
        spots.push([{ start: node.getStart(source), end: node.getEnd() }, JSON.stringify(next)])
      }
    }
    ts.forEachChild(node, (one) => walk(one, held))
  }
  ts.forEachChild(source, (one) => walk(one, false))
  return spots.length === 0 ? text : splicedIn(text, spots)
}

export type Bindings = ReadonlyMap<string, readonly (readonly [Spot, string])[]>

export function bindingsOver(typing: Typing, root: string, one: Renaming): Bindings {
  const found = new Map<string, (readonly [Spot, string])[]>()
  const take = (was: string, now: string, ownToo: boolean): undefined => {
    const declared = new Set(exportsNamed(typing, one.path, was))
    if (declared.size === 0) return
    for (const held of referencesOf(typing, root, declared)) {
      if (!ownToo && held.path === one.path) continue
      const at = found.get(held.path) ?? []
      at.push([{ start: held.start, end: held.end }, boundAs(held, was, now)])
      found.set(held.path, at)
    }
  }
  take(typedAs(one.was), typedAs(one.now), true)
  take(exportedAs(one.was), exportedAs(one.now), false)
  return found
}

const EDGE = new Set(["/", ".", "*"])

const NAMED = /[A-Za-z0-9_$]/

const WORD = /[a-z0-9-]/

const TAIL = /[a-z0-9]/

function contentOf(node: ts.Node): readonly [number, number] | null {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return [1, 1]
  if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node)) return [1, 2]
  return ts.isTemplateTail(node) ? [1, 1] : null
}

export function pathSpelled(content: string, was: string, now: string): string | null {
  let out = ""
  let at = 0
  let found = false
  for (let cut = content.indexOf(was); cut >= 0; cut = content.indexOf(was, at)) {
    const end = cut + was.length
    const before = cut === 0 ? "" : (content[cut - 1] ?? "")
    const after = end === content.length ? "" : (content[end] ?? "")
    const held = EDGE.has(before) && (after === "" || EDGE.has(after))
    out = `${out}${content.slice(at, cut)}${held ? now : was}`
    found = found || held
    at = end
  }
  return found ? `${out}${content.slice(at)}` : null
}

export function pathRespelled(path: string, text: string, was: string, now: string): string | null {
  if (!text.includes(was)) return null
  const source = parsedAs(path, text)
  const spots: (readonly [Spot, string])[] = []
  const walk = (node: ts.Node): undefined => {
    const span = contentOf(node)
    if (span !== null) {
      const start = node.getStart(source) + span[0]
      const end = node.getEnd() - span[1]
      const next = pathSpelled(text.slice(start, end), was, now)
      if (next !== null) spots.push([{ start, end }, next])
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return spots.length === 0 ? null : splicedIn(text, spots)
}

export function nameSpelled(content: string, was: string, now: string): string | null {
  let out = ""
  let at = 0
  let found = false
  for (let cut = content.indexOf(was); cut >= 0; cut = content.indexOf(was, at)) {
    const end = cut + was.length
    const before = cut === 0 ? "" : (content[cut - 1] ?? "")
    const after = end === content.length ? "" : (content[end] ?? "")
    const held = !NAMED.test(before) && !NAMED.test(after)
    out = `${out}${content.slice(at, cut)}${held ? now : was}`
    found = found || held
    at = end
  }
  return found ? `${out}${content.slice(at)}` : null
}

export function nameRespelled(path: string, text: string, was: string, now: string): string | null {
  if (!text.includes(was)) return null
  const source = parsedAs(path, text)
  const spots: (readonly [Spot, string])[] = []
  const walk = (node: ts.Node): undefined => {
    const span = contentOf(node)
    if (span !== null) {
      const start = node.getStart(source) + span[0]
      const end = node.getEnd() - span[1]
      const next = nameSpelled(text.slice(start, end), was, now)
      if (next !== null) spots.push([{ start, end }, next])
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return spots.length === 0 ? null : splicedIn(text, spots)
}

export function namesStill(text: string, was: string): readonly number[] {
  const found: number[] = []
  const lines = text.split("\n")
  for (let at = 0; at < lines.length; at = at + 1) {
    const line = lines[at] ?? ""
    for (let cut = line.indexOf(was); cut >= 0; cut = line.indexOf(was, cut + was.length)) {
      const end = cut + was.length
      const before = cut === 0 ? "" : (line[cut - 1] ?? "")
      const after = end === line.length ? "" : (line[end] ?? "")
      if (!WORD.test(before) && !TAIL.test(after)) {
        found.push(at + 1)
        break
      }
    }
  }
  return found
}
