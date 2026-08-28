/**
 * What a page type declares, and what each page type extends.
 *
 * THIS READS PAGE TYPES AND PROPERTY DEFINITIONS RATHER THAN PAGES. Both questions are answered off
 * the same two kinds of page — a page type's own page, and the property definitions naming it — so
 * they stand together, and apart from `store.ts`, whose questions are about the pages themselves.
 *
 * A QUESTION ABOUT MANY PAGE TYPES IS ASKED ONCE FOR ALL OF THEM. Every answer here costs a walk of
 * the tree and then a read of every page type and every property definition that walk finds, and
 * the read is the greater part by far. Asking once per page type pays the whole of it again each
 * time, which is why both answers here are plural.
 *
 * NOTHING IS HELD BETWEEN CALLS. Each call walks and reads afresh, so a caller wanting one answer
 * about many page types makes one call rather than leaning on a cache none of these keeps.
 */

import type { Property } from "../formula/formula.ts"
import type { Extending } from "../query/expands.ts"
import type { Declared } from "../query/query.ts"
import { type Stated, pagesUnder, statedAt } from "./files.ts"
import { heldBy } from "./held.ts"

/** The kind of a page declaring a page type. */
const PAGE_TYPE = "page-type"

/** The kind of a page declaring one key of a page type. */
export const PROPERTY = "page-property-definition"

/** What a page type is named by, on its own page. */
export const SLUG = "slug"

/** What a page type states the page type it takes its keys from. */
const EXTENDS = "extends-slug"

/** What ends an inheritance chain. */
const NONE = "none"

/** What a property definition states the page type it is declared on, as an address. */
export const DEFINED_ON = "defined-on-slug"

/** What that address begins with, a property definition being declared on a page type. */
export const ON = "page-type/"

/** What a property definition states the key it declares. */
export const KEY = "key"

/** What a property definition states the type that key holds. */
const TYPE = "type"

/** What a property definition states the formula filling that key, where it is computed. */
const FORMULA = "expression"

/** What a page states under one key, where it states a string. */
export const textIn = (stated: Stated, key: string): string | null => {
  const held = stated[key]
  return typeof held === "string" && held !== "" ? held : null
}

/** Every page type under a root, by the slug it names itself with. */
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

/** Every property definition under a root, by the slug of the page type it is declared on. */
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

/**
 * A page type and every page type it takes keys from, the furthest away first.
 *
 * FURTHEST FIRST SO THAT NEARER OVERRIDES. A page type restating a key its parent declares means
 * its own statement, and taking them in this order leaves the nearer one standing.
 *
 * A CHAIN CANNOT RUN FOREVER. A page type extending one that extends it back is stopped at the
 * repeat, which is a wrong answer rather than a hang; that a page type's chain is a line and not a
 * ring is a check over page types rather than something to work out here.
 */
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

/**
 * What one page type declares, out of every page type and property definition already read.
 *
 * A KEY WHOSE STATED TYPE NO FORMULA HOLDS IS CARRIED, under `beyond` rather than dropped, so that
 * a query naming it is refused saying what it holds rather than refused as undeclared.
 *
 * A FORMULA IS CARRIED AS THE PAGE TYPE STATES IT AND IS NOT READ HERE. Whether it is a formula
 * this language reads is `checkFormula`'s answer, given when the page type is checked; a property
 * definition whose `expression` is written in some other language is therefore a page type that
 * refuses, which is a true report of that page type rather than a fault of this read.
 */
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

/**
 * What each of the page types named declares: every key, what each holds, and the formula filling
 * it where computed.
 *
 * THE WHOLE SET, ONE READ. Every page type and every property definition under the root is read
 * once and each answer projected out of that one read. Asking one page type at a time reads all of
 * them again for every one asked, which is most of what a pass over many page types costs.
 *
 * A PAGE TYPE THAT DOES NOT STAND UNDER THE ROOT IS ABSENT FROM THE ANSWER, never present holding
 * nothing. A page type declaring no key at all would read the same way, and only one of the two is
 * a fault; a caller tells them apart by asking the answer whether it holds that slug.
 *
 * WHAT IS ASKED FOR IS WALKED EXACTLY ONCE. A generator satisfies `Iterable` and is spent after one
 * pass, so walking it a second time would find nothing and answer every page type asked about as
 * absent — a silent empty answer where a refusal belongs. The slugs that stand are collected in
 * that one walk, and everything after it works from what was collected.
 *
 * NOTHING STANDING MEANS NO PROPERTY DEFINITION IS READ. A slug naming no page type is answered by
 * a refusal, and a refusal costs the walk and the page types alone rather than the whole read.
 */
export const declarationsFor = (
  root: string,
  pageTypes: Iterable<string>
): Map<string, Declared> => {
  const found = pagesUnder(root, new Set([PAGE_TYPE, PROPERTY]))
  const types = pageTypesIn(root, found.get(PAGE_TYPE) ?? [])
  const standing: string[] = []
  for (const one of pageTypes) if (types.has(one)) standing.push(one)
  const declarations = new Map<string, Declared>()
  if (standing.length === 0) return declarations
  const declared = propertiesIn(root, found.get(PROPERTY) ?? [])
  for (const one of standing) declarations.set(one, declaredBy(types, declared, one))
  return declarations
}

/**
 * What a page type declares: every key, what each holds, and the formula filling it where computed.
 *
 * `null` WHERE NO PAGE TYPE OF THAT SLUG STANDS UNDER THE ROOT, which is the one thing `checkQuery`
 * cannot find out for itself, being pure.
 *
 * ONE PAGE TYPE COSTS THE WHOLE READ, this being `declarationsFor` asked for one, so that what the
 * singular answers cannot drift from what the plural answers. A caller wanting several asks the
 * plural once rather than this once each.
 */
export const declarationOf = (root: string, pageType: string): Declared | null =>
  declarationsFor(root, [pageType]).get(pageType) ?? null

/**
 * What each page type under a root extends, by its own slug.
 *
 * A PAGE TYPE EXTENDING NOTHING IS NOT ANSWERED. `extends-slug: none` ends a chain, and a page type
 * stating no `extends-slug` at all has nothing above it either; neither says anything about what
 * stands beneath it, which is what this is read for.
 *
 * THE WHOLE SET, NOT ONE PAGE TYPE'S KIN. Narrowing it here would mean walking the tree here, and
 * that walk is where a ring among page types is refused — which is a query's refusal, given at
 * checking, and so belongs on the pure side rather than inside a read.
 *
 * WHAT A PAGE TYPE STATES IS TAKEN AS STATED. Whether the slug it extends names a page type that
 * stands is a check over page types; a page type extending one that is gone is answered here as it
 * is written, and expands to a family with nothing under that name in it.
 */
export const extendingIn = (root: string): Extending => {
  const found = pagesUnder(root, new Set([PAGE_TYPE]))
  const extending = new Map<string, string>()
  for (const [slug, stated] of pageTypesIn(root, found.get(PAGE_TYPE) ?? [])) {
    const over = textIn(stated, EXTENDS)
    if (over !== null && over !== NONE) extending.set(slug, over)
  }
  return extending
}
