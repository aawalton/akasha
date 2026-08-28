/**
 * The pages of a page type, and what each one holds.
 *
 * This is where the pages system meets a disk. Everything else under `pages-system/` is pure and
 * takes its values as arguments; this reads them. The split is the point: `pageTypeOf`, `nameOf`,
 * `checkFormula` and `checkQuery` can each be run over the whole corpus in a script because none of
 * them can reach a file, and they stay that way by this package existing.
 *
 * THREE QUESTIONS ARE ANSWERED. What a page type declares, which is what a query is checked against
 * and what a naming is checked against. Which pages that page type has. What one of those pages
 * holds. A resolver is those three and the pure halves put together, and the putting together is
 * the caller's, so that no order of calls is baked in here.
 *
 * NO CLOCK. The moment a page's formulas are worked out arrives as an argument, exactly as it does
 * for a naming, so that two pages read in one pass are read at one moment.
 *
 * NOTHING IS HELD BETWEEN CALLS. Each call walks and reads afresh, which is right while a walk of
 * this repository costs under a tenth of a second and wrong as soon as it does not.
 */

import type { Property, Value, Values } from "../formula/formula.ts"
import type { Declared, Page } from "../query/query.ts"
import { type Stated, pagesUnder, statedAt } from "./files.ts"
import { heldBy, valuedAs } from "./held.ts"

/** The kind of a page declaring a page type. */
const PAGE_TYPE = "page-type"

/** The kind of a page declaring one key of a page type. */
const PROPERTY = "page-property-definition"

/** What a page type is named by, on its own page. */
const SLUG = "slug"

/** What a page type states the page type it takes its keys from. */
const EXTENDS = "extends-slug"

/** What ends an inheritance chain. */
const NONE = "none"

/** What a property definition states the page type it is declared on, as an address. */
const DEFINED_ON = "defined-on-slug"

/** What that address begins with, a property definition being declared on a page type. */
const ON = "page-type/"

/** What a property definition states the key it declares. */
const KEY = "key"

/** What a property definition states the type that key holds. */
const TYPE = "type"

/** What a property definition states the formula filling that key, where it is computed. */
const FORMULA = "expression"

/** A page that could not be read, and why. */
export type Unread = {
  /** Where the page is, as `pagesOf` answered it. */
  readonly at: string
  /** What was wrong, in the terms a reader of the file would put it. */
  readonly unread: string
}

/** What a page states under one key, where it states a string. */
const textIn = (stated: Stated, key: string): string | null => {
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
 * What a page type declares: every key, what each holds, and the formula filling it where computed.
 *
 * `null` WHERE NO PAGE TYPE OF THAT SLUG STANDS UNDER THE ROOT, which is the one thing `checkQuery`
 * cannot find out for itself, being pure.
 *
 * A KEY WHOSE STATED TYPE NO FORMULA HOLDS IS CARRIED, under `beyond` rather than dropped, so that
 * a query naming it is refused saying what it holds rather than refused as undeclared.
 *
 * A FORMULA IS CARRIED AS THE PAGE TYPE STATES IT AND IS NOT READ HERE. Whether it is a formula
 * this language reads is `checkFormula`'s answer, given when the page type is checked; a property
 * definition whose `expression` is written in some other language is therefore a page type that
 * refuses, which is a true report of that page type rather than a fault of this read.
 */
export const declarationOf = (root: string, pageType: string): Declared | null => {
  const found = pagesUnder(root, new Set([PAGE_TYPE, PROPERTY]))
  const types = pageTypesIn(root, found.get(PAGE_TYPE) ?? [])
  if (!types.has(pageType)) return null
  const declared = propertiesIn(root, found.get(PROPERTY) ?? [])

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
 * Every page of a page type, as paths relative to the root, in whatever order the walk found them.
 *
 * THE PAGE TYPE NEED NOT STAND. A slug naming no page type answers no pages, the same as one whose
 * pages are all gone, because what makes a file a page of this type is its own name and nothing
 * asks a page type. Whether the page type stands is `declarationOf`'s answer.
 *
 * NO ORDER IS PROMISED. A caller wanting one sorts, and a query wanting one has nowhere to say so
 * yet.
 */
export const pagesOf = (root: string, pageType: string): readonly string[] =>
  pagesUnder(root, new Set([pageType])).get(pageType) ?? []

/**
 * What one page holds, under the types its page type declares, or why it could not be read.
 *
 * EVERY DECLARED KEY IS ANSWERED, including the ones the page states nothing under, which answer
 * absent. A formula reads a key it is not handed as absent anyway, so this changes no answer; it
 * makes what the page holds a picture of what its page type declares rather than of what happened
 * to be written down.
 *
 * A KEY BEYOND THE LANGUAGE IS NOT ANSWERED. There is no value to answer it with, which is what
 * `beyond` means, and a query naming one never got past its check.
 *
 * WHAT A PAGE STATES IS ITS FRONTMATTER. The rows beside a page in a sidecar are stated too and are
 * not read here; a key a page type marks `uncommitted` therefore answers absent.
 */
export const pageAt = (
  root: string,
  at: string,
  declared: Declared,
  now: number
): Page | Unread => {
  const stated = statedAt(root, at)
  if (typeof stated === "string") return { at, unread: stated }
  const properties: Record<string, Value> = {}
  for (const [key, property] of Object.entries(declared.properties)) {
    properties[key] = valuedAs(stated[key], property.type)
  }
  return { at, values: { now, properties } satisfies Values }
}
