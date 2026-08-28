import type { Property } from "../formula/formula.ts"
import type { Extending } from "../query/expands.ts"
import type { Declared } from "../query/query.ts"
import { type Stated, pagesUnder, statedAt } from "./files.ts"
import { heldBy } from "./held.ts"

const PAGE_TYPE = "page-type"

export const PROPERTY = "page-property-definition"

export const SLUG = "slug"

const EXTENDS = "extends-slug"

const NONE = "none"

export const DEFINED_ON = "defined-on-slug"

export const ON = "page-type/"

export const KEY = "key"

const TYPE = "type"

const FORMULA = "expression"

export const textIn = (stated: Stated, key: string): string | null => {
  const held = stated[key]
  return typeof held === "string" && held !== "" ? held : null
}

const pageTypesIn = (root: string, at: readonly string[]): ReadonlyMap<string, Stated> => {
  const found = new Map<string, Stated>()
  for (const one of at) {
    const stated = statedAt(root, one)
    if (typeof stated === "string") continue
    const slug = textIn(stated, SLUG)
    if (slug !== null && !found.has(slug)) found.set(slug, stated)
  }
  return found
}

const propertiesIn = (root: string, at: readonly string[]): ReadonlyMap<string, Stated[]> => {
  const found = new Map<string, Stated[]>()
  for (const one of at) {
    const stated = statedAt(root, one)
    if (typeof stated === "string") continue
    const on = textIn(stated, DEFINED_ON)
    if (on === null || !on.startsWith(ON)) continue
    const slug = on.slice(ON.length)
    const held = found.get(slug)
    if (held === undefined) found.set(slug, [stated])
    else held.push(stated)
  }
  return found
}

const chainTo = (types: ReadonlyMap<string, Stated>, slug: string): readonly string[] => {
  const chain: string[] = []
  const walked = new Set<string>()
  let at: string | null = slug
  while (at !== null && at !== NONE && !walked.has(at)) {
    walked.add(at)
    chain.unshift(at)
    const stated = types.get(at)
    at = stated === undefined ? null : textIn(stated, EXTENDS)
  }
  return chain
}

const declaredBy = (
  types: ReadonlyMap<string, Stated>,
  declared: ReadonlyMap<string, Stated[]>,
  pageType: string
): Declared => {
  const properties: Record<string, Property> = {}
  const beyond: Record<string, string> = {}
  for (const one of chainTo(types, pageType)) {
    for (const stated of declared.get(one) ?? []) {
      const key = textIn(stated, KEY)
      const spelling = textIn(stated, TYPE)
      if (key === null || spelling === null) continue
      const type = heldBy(spelling)
      if (type === null) {
        delete properties[key]
        beyond[key] = spelling
        continue
      }
      delete beyond[key]
      const formula = textIn(stated, FORMULA)
      properties[key] = formula === null ? { type } : { type, formula }
    }
  }
  return { properties, beyond }
}

export const declarationsFor = (
  root: string,
  pageTypes: Iterable<string>
): Map<string, Declared> | string => {
  const found = pagesUnder(root, new Set([PAGE_TYPE, PROPERTY]))
  if (typeof found === "string") return found
  const types = pageTypesIn(root, found.get(PAGE_TYPE) ?? [])
  const standing: string[] = []
  for (const one of pageTypes) if (types.has(one)) standing.push(one)
  const declarations = new Map<string, Declared>()
  if (standing.length === 0) return declarations
  const declared = propertiesIn(root, found.get(PROPERTY) ?? [])
  for (const one of standing) declarations.set(one, declaredBy(types, declared, one))
  return declarations
}

export const declarationOf = (root: string, pageType: string): Declared | string | null => {
  const found = declarationsFor(root, [pageType])
  if (typeof found === "string") return found
  return found.get(pageType) ?? null
}

export const extendingIn = (root: string): Extending | string => {
  const found = pagesUnder(root, new Set([PAGE_TYPE]))
  if (typeof found === "string") return found
  const extending = new Map<string, string>()
  for (const [slug, stated] of pageTypesIn(root, found.get(PAGE_TYPE) ?? [])) {
    const over = textIn(stated, EXTENDS)
    if (over !== null && over !== NONE) extending.set(slug, over)
  }
  return extending
}
