/**
 * The pages of a page type, and what each one holds.
 *
 * This is where the pages system meets a disk. Everything else under `pages-system/` is pure and
 * takes its values as arguments; this reads them. The split is the point: `pageTypeOf`, `nameOf`,
 * `checkFormula` and `checkQuery` can each be run over the whole corpus in a script because none of
 * them can reach a file, and they stay that way by this package existing.
 *
 * FOUR QUESTIONS ARE ANSWERED. What a page type declares, which is what a query is checked against
 * and what a naming is checked against. What each page type extends, which is what a query expanding
 * one page type into the page types beneath it is checked against. Which pages a page type has. What
 * one of those pages holds. A resolver is those four and the pure halves put together, and the
 * putting together is the caller's, so that no order of calls is baked in here.
 *
 * WHERE A PAGE STANDS IS AN ADDRESS THIS PACKAGE ISSUES AND READS BACK, never a path a caller may
 * take apart or join to a root. A page is a file and its rows are a sidecar beside it, so a page of
 * a page type stating `files: none` — `session-tracking` is one — stands as a line in another page's
 * sidecar and has no file of its own to be named by. Rows enter here and nowhere else: `pagesOf`
 * learns to answer a holder's rows, `pageAt` learns to read one back, and no caller can tell. A
 * caller that reads a file at an address is a caller rows would break.
 *
 * NO CLOCK. The moment a page's formulas are worked out arrives as an argument, exactly as it does
 * for a naming, so that two pages read in one pass are read at one moment.
 *
 * NOTHING IS HELD BETWEEN CALLS. Each call walks and reads afresh, which is right while a walk of
 * this repository costs under a tenth of a second and wrong as soon as it does not.
 */

import type { Property, Value, Values } from "../formula/formula.ts"
import type { Declared, Extending, Page } from "../query/query.ts"
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
  /** Where the page stands, as `pagesOf` answered it. */
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

/**
 * Where every page of a page type stands, in whatever order they were found.
 *
 * AN ADDRESS IS THIS PACKAGE'S TO READ. A page held in a file is addressed by its path below the
 * root, which is what every address is today; a page held as a row will be addressed by its holder
 * and its place in it, and only `pageAt` will know the difference.
 *
 * THE PAGE TYPE NEED NOT STAND. A slug naming no page type answers no pages, the same as one whose
 * pages are all gone, because what makes a file a page of this type is its own name and nothing
 * asks a page type. Whether the page type stands is `declarationOf`'s answer.
 *
 * A PAGE TYPE WHOSE PAGES ARE ROWS ANSWERS NONE OF THEM YET. Nothing here reads a sidecar, so a
 * page type stating `files: none` answers empty rather than refusing — which is the one place a
 * caller can still tell, and the reason the row half is worth adding before a caller relies on it.
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
 * WHAT A PAGE IN A FILE STATES IS ITS FRONTMATTER, and every address is one of those today. What a
 * page states in a sidecar beside it — the rows under a key declared `pages`, and the values under
 * a key marked `uncommitted` — is stated as truly and is not read here, so such a key answers
 * absent.
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
