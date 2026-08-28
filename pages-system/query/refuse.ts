/**
 * Why a query is refused for what its own fields say, rather than for the text of its `where`.
 *
 * A `where` IS REFUSED WHERE IT STANDS, by `checkFormula`, in the terms it was written in and at a
 * place in its own text. Every other field a query states is a key or a number rather than a text
 * with places in it, so a fault in one is reported about the query as a whole, at its start. That
 * is the whole of what separates these refusals from the ones `formula/` answers.
 *
 * EVERY ONE OF THESE RUNS AT CHECKING. `pages/domain/page-queries-system.domain.md:20` states the
 * law they serve: "A narrow the query cannot read is refused, never dropped." A field the checker
 * cannot read has no safe reading, because pages that were never narrowed read exactly like pages a
 * narrow held of.
 *
 * PURE. Nothing here reads a page or a file. What a page type declares arrives as an argument.
 */

import type { DeclaredType, Place, Refused } from "../formula/formula.ts"
import type { Declared, Query } from "./query.ts"

/** Where a refusal of this package's own points: a `where` is held whole, so at its start. */
export const START: Place = { offset: 0, line: 1, column: 1 }

/** What a reduction reduces. Adding one text to another is no sum. */
const NUMBER = "number"

/** `a` or `an`, for a refusal that names a type. */
export const an = (word: string): string =>
  ["a", "e", "i", "o", "u"].includes(word[0] ?? "") ? `an ${word}` : `a ${word}`

/** How the type a `where` answers is named in a refusal. */
export const answering = (holds: DeclaredType | null): string => {
  if (holds === null) return "absent and nothing else"
  return holds.kind === "list" ? `a list of ${holds.of}` : an(holds.kind)
}

/** A query refused for what it asks of a page type, rather than for the text of its `where`. */
export const refuseQuery = (message: string): Refused => ({
  ok: false,
  moment: "checking",
  message,
  at: START,
})

/** What a refusal says of a `where` naming keys no formula holds. */
export const beyondSaid = (
  named: readonly string[],
  beyond: Readonly<Record<string, string>>
): string =>
  [...named]
    .sort()
    .map((key) => `\`${key}\` is declared to hold \`${beyond[key]}\`, which no formula holds`)
    .join("; ")

/**
 * Why a query's limit cannot be read, or nothing where it can.
 *
 * A LIMIT IS A COUNT OF PAGES, so it is a whole number and never fewer than none.
 * `pages/page-property-definition/page-query-limit.page-property-definition.md:14` calls it "how
 * many pages a page query answers with", and there is no such thing as minus three pages or half a
 * page. A negative limit taken as an offset from the end, or a fraction quietly rounded, answers a
 * set of pages that reads exactly like the set a whole limit asked for.
 *
 * NOUGHT IS A LIMIT AND NOT AN ABSENCE. A query stating `limit: 0` asks for no pages and gets none;
 * a query stating no limit asks for every page its `where` held of. The two are told apart by
 * whether the field is stated rather than by reading the number.
 */
export const limitRefused = (query: Query): string | null => {
  const limit = query.limit
  if (limit === undefined) return null
  if (!Number.isInteger(limit)) {
    return `a \`limit\` is a whole number of pages, and this one states \`${limit}\``
  }
  if (limit < 0) {
    return `a \`limit\` is how many pages a query answers with, so it is never fewer than none, and this one states \`${limit}\``
  }
  return null
}

/**
 * Why a query's reduction cannot be worked out, or nothing where it can.
 *
 * THE TWO FIELDS STAND OR FALL TOGETHER. Either alone is a query whose writer meant a reduction and
 * did not get one, and answering pages instead reads exactly like a query that asked for pages.
 *
 * A TARGET IS HELD TO A NUMBER, and to the declaration of the page type NAMED, as the `where` is. A
 * reduction that skipped every page for holding no number would answer absent over nought — a true
 * empty spelling for a query pointed at the wrong key.
 */
export const reductionRefused = (query: Query, declared: Declared): string | null => {
  const how = query.function
  const target = query.target
  if (how === undefined && target === undefined) return null
  if (how === undefined) {
    return "a query stating a `target` states how it reduces it, and this one states no `function`"
  }
  if (target === undefined) {
    return "a query stating a `function` states the key it reduces, and this one states no `target`"
  }
  const beyond = declared.beyond[target]
  if (beyond !== undefined) {
    return `\`${target}\` is declared to hold \`${beyond}\`, which no reduction reduces`
  }
  const property = declared.properties[target]
  if (property === undefined) return `no page type this asks about declares \`${target}\``
  if (property.type.kind !== NUMBER) {
    return `a reduction reduces a number, and \`${target}\` holds ${answering(property.type)}`
  }
  return null
}
