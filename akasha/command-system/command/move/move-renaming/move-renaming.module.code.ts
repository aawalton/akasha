import { basename } from "node:path"
import ts from "typescript"
import { parsedAs } from "../../../../code-system/code-source/code-source.module.code.ts"
import { spelledIn } from "../../../../code-system/code-specifier/code-specifier.module.code.ts"
import { NOT_A_RELATION } from "../../../../pages-system/indexes/index/index-relation/index-relation.index.code.ts"
import type { Value } from "../../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import { valueIn } from "../../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  indexIn,
  namersOf,
} from "../../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import {
  knownIn,
  namesIn,
  reaches,
  recordsIn,
  type Shaped,
} from "../../../../pages-system/indexes/reaching/reaching.module.code.ts"
import { addressIn } from "../../../../pages-system/page/page-address/page-address.module.code.ts"
import { exportedAs } from "../../../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { namedIn } from "../../../../pages-system/page/page-file-name/page-file-name.module.code.ts"

const SLUG = "slug"

const PAGE_TYPE = "page-type"

export type Renaming = {
  readonly id: string
  readonly was: string
  readonly now: string
  readonly pageTypeSlug: string
}

export type Asked = { readonly renaming: Renaming } | { readonly refused: string }

export function renamingFor(from: string, to: string, id: string): Asked {
  const was = namedIn(from)
  const now = namedIn(to)
  if (was === null || now === null || was.held !== now.held || was.tail !== now.tail) {
    return {
      refused:
        `${from} would arrive called \`${basename(to)}\` — a move carries a body under the name ` +
        "it already has, and the one name it changes is the slug a page states",
    }
  }
  if (was.tail === PAGE_TYPE) {
    return {
      refused:
        `${from} states a page type's slug, and that slug is the tail of every file naming a page ` +
        "of that type and the scope every one of their slugs is unique within, so a page type's " +
        "slug is not renamed here",
    }
  }
  return { renaming: { id, was: was.stem, now: now.stem, pageTypeSlug: was.tail } }
}

export function besideRenamed(name: string, one: Renaming): string {
  const said = `${one.was}.${one.pageTypeSlug}.`
  return name.startsWith(said) ? `${one.now}.${one.pageTypeSlug}.${name.slice(said.length)}` : name
}

type Spot = { readonly start: number; readonly end: number }

function literalOf(node: ts.Expression): ts.ObjectLiteralExpression | null {
  if (ts.isObjectLiteralExpression(node)) return node
  if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) return literalOf(node.expression)
  return null
}

function slugSpotIn(source: ts.SourceFile, held: ts.ObjectLiteralExpression): Spot | null {
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one)) continue
    const key = ts.isIdentifier(one.name) || ts.isStringLiteral(one.name) ? one.name.text : null
    if (key !== SLUG || !ts.isStringLiteral(one.initializer)) continue
    return { start: one.initializer.getStart(source), end: one.initializer.getEnd() }
  }
  return null
}

export type Stated = { readonly name: Spot; readonly slug: Spot }

export function statedIn(path: string, text: string): Stated | null {
  const source = parsedAs(path, text)
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const one of statement.declarationList.declarations) {
      if (one.initializer === undefined || !ts.isIdentifier(one.name)) continue
      const held = literalOf(one.initializer)
      const slug = held === null ? null : slugSpotIn(source, held)
      if (slug === null) continue
      return { name: { start: one.name.getStart(source), end: one.name.getEnd() }, slug }
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

export function restated(path: string, text: string, now: string): string | null {
  const said = statedIn(path, text)
  if (said === null) return null
  return splicedIn(text, [
    [said.name, exportedAs(now)],
    [said.slug, JSON.stringify(now)],
  ])
}

export function addressingIn(value: Value, known: Shaped, id: string): readonly string[] {
  const found = new Set<string>()
  const take = (propertySlug: string, held: unknown): undefined => {
    const wanted = known.targetOf(propertySlug)
    if (wanted === null) return
    for (const named of namesIn(held)) {
      const reached = reaches(named, wanted, known)
      if (!("refused" in reached) && reached.id === id) found.add(named)
    }
  }
  for (const [key, held] of Object.entries(value)) {
    if (NOT_A_RELATION.has(key) || held === null) continue
    const propertySlug = known.slugOfKey(key)
    if (propertySlug === null) continue
    if (known.targetOf(propertySlug) !== null) {
      take(propertySlug, held)
      continue
    }
    const fields = known.fieldsOf(propertySlug)
    if (fields.length === 0) continue
    for (const entry of recordsIn(held)) {
      for (const [inner, said] of Object.entries(entry)) {
        const field = known.slugOfKey(inner)
        if (field !== null && fields.includes(field)) take(field, said)
      }
    }
  }
  return [...found]
}

export function readdressed(named: string, now: string): string | null {
  const address = addressIn(named)
  if (address.kind === "id") return null
  return address.kind === "qualified" ? `${address.pageTypeSlug}/${now}` : now
}

export function respelled(path: string, text: string, said: ReadonlyMap<string, string>): string {
  if (said.size === 0) return text
  let out = ""
  let at = 0
  for (const one of spelledIn(path, text)) {
    const next = said.get(one.text)
    if (next === undefined) continue
    out = `${out}${text.slice(at, one.start)}${JSON.stringify(next)}`
    at = one.end
  }
  return `${out}${text.slice(at)}`
}

export type Addressing = ReadonlyMap<string, ReadonlyMap<string, string>>

export const NOTHING_ADDRESSED: Addressing = new Map()

export function addressingOver(
  root: string,
  renamings: readonly Renaming[],
  textOf: (path: string) => string | null
): Addressing {
  if (renamings.length === 0) return NOTHING_ADDRESSED
  const loadedAt = (path: string): Value | null => {
    const text = textOf(path)
    return text === null ? null : valueIn(text)
  }
  const known = knownIn(indexIn(root), root, loadedAt)
  const found = new Map<string, Map<string, string>>()
  for (const one of renamings) {
    for (const path of new Set(namersOf(root, one.id).map((named) => named.path))) {
      const value = loadedAt(path)
      if (value === null) continue
      const held = found.get(path) ?? new Map<string, string>()
      for (const said of addressingIn(value, known, one.id)) {
        const next = readdressed(said, one.now)
        if (next !== null && next !== said) held.set(said, next)
      }
      if (held.size > 0) found.set(path, held)
    }
  }
  return found
}
