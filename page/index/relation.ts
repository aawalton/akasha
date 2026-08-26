import { listField } from "../frontmatter.ts"
import type { PageAt } from "../page-at.ts"
import { NONE, stringAt } from "../text.ts"
import { type Held, type Identity, kindOf } from "./identity.ts"

const DEFINITION = "page-property-definition"

const PAGE_TYPE = "page-type"

const TYPE = "type"

const KEY = "key"

const DEFINED_ON = "defined-on-slug"

const TARGET = "target-slug"

const EXTENDS = "extends-slug"

const PAGE_TYPE_SLUG = "page-type-slug"

const ADDRESS_JOIN = "/"

export type Relation = {
  readonly key: string
  readonly kind: string
  readonly target: string | null
}

export type Reached = {
  readonly relation: string
  readonly to: PageAt
}

function tailOf(stated: string | null): string | null {
  if (stated === null || stated === NONE) return null
  const cut = stated.lastIndexOf(ADDRESS_JOIN)
  return cut < 0 ? stated : stated.slice(cut + 1)
}

function declaredOver(pages: readonly Held[]): Map<string, Relation[]> {
  const made = new Map<string, Relation[]>()
  for (const at of pages) {
    if (at.type !== DEFINITION) continue
    const kind = kindOf(stringAt(at.fm, TYPE) ?? "")
    if (kind === null) continue
    const on = tailOf(stringAt(at.fm, DEFINED_ON))
    const key = stringAt(at.fm, KEY)
    if (on === null || key === null) continue
    const held = made.get(on) ?? []
    held.push({ key, kind, target: tailOf(stringAt(at.fm, TARGET)) })
    made.set(on, held)
  }
  return made
}

function aboveOver(pages: readonly Held[]): Map<string, string | null> {
  const made = new Map<string, string | null>()
  for (const at of pages) {
    if (at.type !== PAGE_TYPE) continue
    made.set(at.stem, tailOf(stringAt(at.fm, EXTENDS)))
  }
  return made
}

export function relationsOver(pages: readonly Held[]): ReadonlyMap<string, readonly Relation[]> {
  const declared = declaredOver(pages)
  const above = aboveOver(pages)
  const made = new Map<string, readonly Relation[]>()
  for (const type of above.keys()) {
    const held: Relation[] = []
    const taken = new Set<string>()
    const seen = new Set<string>()
    let walking: string | null = type
    while (walking !== null && !seen.has(walking)) {
      seen.add(walking)
      for (const one of declared.get(walking) ?? []) {
        if (taken.has(one.key)) continue
        taken.add(one.key)
        held.push(one)
      }
      walking = above.get(walking) ?? null
    }
    made.set(type, held)
  }
  return made
}

export function reachedFrom(
  at: Held,
  relations: ReadonlyMap<string, readonly Relation[]>,
  identity: Identity
): readonly Reached[] {
  const type = stringAt(at.fm, PAGE_TYPE_SLUG) ?? at.type
  const found: Reached[] = []
  const seen = new Set<string>()
  for (const relation of relations.get(type) ?? []) {
    for (const value of listField(at.fm, relation.key)) {
      if (value === "" || value === NONE) continue
      const to = identity.at(relation.kind, relation.target, value)
      if (to === null) continue
      const said = `${relation.key} ${to.repo} ${to.key}`
      if (seen.has(said)) continue
      seen.add(said)
      found.push({ relation: relation.key, to })
    }
  }
  return found
}
