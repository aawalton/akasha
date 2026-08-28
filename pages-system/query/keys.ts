/**
 * Which keys a query answers with, across every page type it asks about.
 *
 * A QUERY OVER AN EXPANDED SET ASKS ONE SET OF KEYS OF PAGE TYPES THAT DO NOT DECLARE ALIKE. A page
 * type beneath another inherits every key it declares and may add more, so a key asked across a
 * family is declared by some of that family and not the rest. This settles what that means, and
 * refuses the two cases where the answer would be pages of nothing at all.
 *
 * THE TWO REFUSALS ARE ONE LAW: the keys asked for and the page types asked about must cover each
 * other. A key no page type in the set declares names nothing, and would stand absent on every page
 * answered. A page type declaring none of the asked keys answers pages absent under every one of
 * them, and thousands of those read as a set of pages found rather than as a query that asked the
 * wrong thing. Both are refused at checking, in the terms the query was written in, because once
 * the query has run there is nothing left to tell either from an answer.
 *
 * A KEY DECLARED BY SOME OF THE SET AND NOT THE REST IS THE ORDINARY CASE and is not refused. It is
 * what asking about a supertype is for: the pages of the page types declaring it answer it, and the
 * pages of the rest answer absent under it.
 *
 * EVERY ASKED KEY STANDS ON EVERY PAGE ANSWERED. A page carrying only the keys its own page type
 * declares would hand a caller nothing at all where it asked for a value, and a caller reading
 * across a family cannot tell which page type each page came from without asking. Absent is a value
 * and says the page holds nothing under the key; a key that is simply not there is not an answer.
 *
 * PURE. What each page type declares arrives as an argument, and no page is read here.
 */

import type { Value, Values } from "../formula/formula.ts"
import type { Declared, Page } from "./query.ts"

/**
 * What each page type a query asks about declares, by its own slug.
 *
 * ONE DECLARATION IS NOT ENOUGH FOR THIS AND IS ENOUGH FOR A `where`. A `where` is held to what the
 * page type named declares, which every page type beneath it inherits; which page types beneath
 * declare a key added further down is a different question, and this is what answers it.
 *
 * A PAGE TYPE ASKED ABOUT AND NOT HELD HERE IS A REFUSAL RATHER THAN A GAP. Reading it as declaring
 * nothing would answer the same as a page type that really declares none of the keys, and reading
 * it as declaring everything would let a key nothing declares through.
 */
export type Declaring = ReadonlyMap<string, Declared>

/** How many page types a refusal names before it counts the rest. */
const NAMED = 3

/** What an asked key holds on a page holding nothing under it. */
const ABSENT: Value = { kind: "absent" }

/** A set of keys, in a refusal, in the terms the query named them in. */
const keysSaid = (keys: readonly string[]): string => keys.map((key) => `\`${key}\``).join(", ")

/**
 * A set of page types, in a refusal: a few by name and a count of the rest.
 *
 * A FAMILY RUNS TO HUNDREDS. Naming every page type beneath `page` would answer a refusal longer
 * than the query, and a reader needs enough to recognise the set rather than all of it.
 */
const typesSaid = (slugs: readonly string[]): string => {
  const shown = keysSaid(slugs.slice(0, NAMED))
  const rest = slugs.length - NAMED
  return rest > 0 ? `${shown} and ${rest} more` : shown
}

/**
 * Why the keys a query asks for cannot be answered across the page types it asks about, or nothing
 * where they can.
 *
 * A KEY DECLARED TO HOLD WHAT A PAGE IS NOT ANSWERED WITH IS REFUSED SAYING SO, rather than as a key
 * nothing declares. A store reads no value for such a key, so asking for it would answer absent on
 * every page — the same silence, reported as the wrong fault.
 *
 * A PAGE TYPE IS NAMED RATHER THAN THE KEYS IT MISSES. What a reader does about a page type
 * covering none of the asked keys is narrow the set or ask for a key it declares, and either needs
 * the page type named; the keys were in the query already.
 *
 * A KEY NOWHERE IS REPORTED BEFORE A PAGE TYPE COVERING NOTHING. The first is a fault in the words
 * the query was written in and the second is a fault in the set it was pointed at, and a reader
 * mending the words may not need to hear about the set at all.
 */
export const keysRefused = (
  keys: readonly string[],
  pageTypes: readonly string[],
  declaring: Declaring
): string | null => {
  if (keys.length === 0) {
    return "a query asking for keys asks for at least one, and this one asks for none"
  }

  const missing = pageTypes.filter((one) => !declaring.has(one))
  if (missing.length > 0) {
    return `the keys asked for are held to what every page type asked about declares, and nothing was handed in for ${typesSaid(missing)}`
  }

  const reached = new Set<string>()
  const beyond = new Map<string, string>()
  const bare: string[] = []
  for (const slug of pageTypes) {
    const declared = declaring.get(slug) as Declared
    let holds = false
    for (const key of keys) {
      if (key in declared.properties) {
        reached.add(key)
        holds = true
      } else {
        const spelling = declared.beyond[key]
        if (spelling !== undefined) beyond.set(key, spelling)
      }
    }
    if (!holds) bare.push(slug)
  }

  const nowhere = keys.filter((key) => !reached.has(key))
  const held = nowhere.find((key) => beyond.has(key))
  if (held !== undefined) {
    return `\`${held}\` is declared to hold \`${beyond.get(held)}\`, which a page is not answered with`
  }
  if (nowhere.length > 0) {
    return `no page type this asks about declares ${keysSaid(nowhere)}`
  }
  if (bare.length > 0) {
    return `no key asked for is declared by ${typesSaid(bare)}, whose pages would answer absent under every one of them`
  }
  return null
}

/**
 * Every page narrowed to the keys asked for, or the pages as they stand where none were asked for.
 *
 * NARROWING COMES AFTER THE TEST. A `where` names the keys it names, which need not be among the
 * keys asked for, so a page narrowed before its test ran would be tested against less than it holds.
 *
 * THE MOMENT IS CARRIED THROUGH. A narrowed page is the same page read at the same moment, and a
 * formula worked out over one afterwards would otherwise answer a different `now()`.
 */
export const narrowed = (
  pages: readonly Page[],
  keys: readonly string[] | null
): readonly Page[] => {
  if (keys === null) return pages
  return pages.map((page) => {
    const properties: Record<string, Value> = {}
    for (const key of keys) properties[key] = page.values.properties[key] ?? ABSENT
    return { at: page.at, values: { now: page.values.now, properties } satisfies Values }
  })
}
