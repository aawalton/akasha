// The query language conformance corpus.
//
// Every case here is derived from the written specification and from nothing
// else, as `pages/domain/language-conformance.domain.md:27` requires: "Hold
// every implementation to the written meaning, never to another
// implementation." The older query layer under `tools/lib/page-query-*` was
// read to learn which cases exist, never to settle what one answers.
//
// The specification is:
//   pages/domain/page-queries-system.domain.md
//   pages/domain/page-query-language.domain.md
//   pages/page-type/page-query.page-type.md
//   pages/page-property-definition/page-query-*.page-property-definition.md
//   pages/list/formula-operators.list.md
//
// Each case names the line it comes from in `from` and quotes that line in
// `claim`, so a disagreement between an implementation and this corpus is
// settled by opening the page rather than by arguing. The test beside this file
// holds every quote to the page it cites.
//
// This corpus is plain data. It knows about no evaluator.

import type { Value } from "../../formula/formula.ts"
import type { Declared, Query } from "../query.ts"

/** Where a case's claim is written. */
export type Citation = { readonly page: string; readonly line: number }

/** A citation as one string, for a failure message or a grep. */
export const citationText = (from: Citation): string => `${from.page}:${from.line}`

/**
 * Something this corpus reads off what the pages leave out rather than off what
 * they say, marked so every case resting on it can be found again if a page
 * comes to say otherwise.
 */
export type Provisional =
  /**
   * That a text orders by code point. `page-query-sort-by` says a query orders
   * by a property and `page-query-language.domain.md:23` says the declared type
   * settles the comparison, but no page writes which of two texts comes first.
   */
  | "text-orders-by-code-point"
  /**
   * That pages holding nothing under the sort key stand last. That they are not
   * ordered against pages holding one is written; where they land is not.
   */
  | "absent-orders-last"

/** What a case expects. */
export type Outcome =
  /** The query is refused, and the refusal carries these words. */
  | { readonly outcome: "refused"; readonly mustName: readonly string[] }
  /** The query answers these pages, named by `at`, in this order. */
  | { readonly outcome: "answers"; readonly at: readonly string[] }

export type CaseGroup = "order" | "limit"

export interface QueryCase {
  /** Unique, and readable on its own in a failure line. */
  readonly name: string
  readonly group: CaseGroup
  /** Where the claim this case tests is written. */
  readonly from: Citation
  /** The claim, quoting the cited line exactly. */
  readonly claim: string
  /** The query, exactly as a caller would state it. */
  readonly query: Query
  /** What the page type declares. */
  readonly declared: Declared
  /** The pages it is run over, in the order they arrive. */
  readonly pages: readonly { readonly at: string; readonly values: Record<string, Value> }[]
  readonly expected: Outcome
  readonly provisional?: Provisional
}

// ---------------------------------------------------------------------------
// Shorthand
// ---------------------------------------------------------------------------

export const text = (value: string): Value => ({ kind: "text", text: value })
export const num = (value: number): Value => ({ kind: "number", number: value })
export const when = (value: number): Value => ({ kind: "instant", instant: value })

/** A page type declaring one key of each kind an order is asked about. */
const DECLARED: Declared = {
  properties: {
    title: { type: { kind: "text" } },
    rank: { type: { kind: "number" } },
    "played-at": { type: { kind: "instant" } },
    live: { type: { kind: "boolean" } },
    tags: { type: { kind: "list", of: "text" } },
  },
  beyond: { notes: "json" },
}

const NOTHING: readonly { at: string; values: Record<string, Value> }[] = []

// ---------------------------------------------------------------------------
// Citations
// ---------------------------------------------------------------------------

const REFUSED_NOT_DROPPED: Citation = {
  page: "pages/domain/page-queries-system.domain.md",
  line: 20,
}
const BY_DECLARED_TYPE: Citation = {
  page: "pages/domain/page-query-language.domain.md",
  line: 23,
}
const ORDERS_ITS_ANSWER: Citation = {
  page: "pages/page-property-definition/page-query-sort-by.page-property-definition.md",
  line: 14,
}
const HIGHEST_DOWN: Citation = {
  page: "pages/page-property-definition/page-query-descending.page-property-definition.md",
  line: 14,
}
const FALLS_ON_NEITHER: Citation = {
  page: "pages/page-property-definition/page-query-test-before.page-property-definition.md",
  line: 18,
}
const LESS_THAN: Citation = { page: "pages/list/formula-operators.list.md", line: 21 }
const HOW_MANY: Citation = {
  page: "pages/page-property-definition/page-query-limit.page-property-definition.md",
  line: 14,
}

const NOT_DROPPED = "A narrow the query cannot read is refused, never dropped."
const DECLARED_TYPE = "A page query compares a value by the type its property declares."
const ORDERS_BY = "Page query sort by — the property a page query orders its answer by."
const FROM_HIGHEST =
  "Page query descending — whether a page query orders from the highest value down."
const NEITHER =
  "Before and at or after divide the pages carrying a value in two, each falling on one side. A page carrying no value at all falls on neither."
const IS_LESS = "< — whether one number is less than another."
const ANSWERS_WITH = "Page query limit — how many pages a page query answers with."

// ---------------------------------------------------------------------------
// The corpus
// ---------------------------------------------------------------------------

export const cases: QueryCase[] = [
  {
    name: "a sort-by naming a key nothing declares is refused",
    group: "order",
    from: REFUSED_NOT_DROPPED,
    claim: NOT_DROPPED,
    query: { pageType: "song", sortBy: "playedat" },
    declared: DECLARED,
    pages: NOTHING,
    expected: { outcome: "refused", mustName: ["playedat"] },
  },
  {
    name: "a sort-by naming a key beyond the formula language is refused saying what it holds",
    group: "order",
    from: REFUSED_NOT_DROPPED,
    claim: NOT_DROPPED,
    query: { pageType: "song", sortBy: "notes" },
    declared: DECLARED,
    pages: NOTHING,
    expected: { outcome: "refused", mustName: ["notes", "json"] },
  },
  {
    name: "a descending stating no sort-by is refused",
    group: "order",
    from: REFUSED_NOT_DROPPED,
    claim: NOT_DROPPED,
    query: { pageType: "song", descending: true },
    declared: DECLARED,
    pages: NOTHING,
    expected: { outcome: "refused", mustName: ["descending", "sort-by"] },
  },
  {
    name: "a sort-by naming a boolean is refused, no page writing an order for one",
    group: "order",
    from: LESS_THAN,
    claim: IS_LESS,
    query: { pageType: "song", sortBy: "live" },
    declared: DECLARED,
    pages: NOTHING,
    expected: { outcome: "refused", mustName: ["live", "boolean"] },
  },
  {
    name: "a sort-by naming a list is refused, no page writing an order for one",
    group: "order",
    from: LESS_THAN,
    claim: IS_LESS,
    query: { pageType: "song", sortBy: "tags" },
    declared: DECLARED,
    pages: NOTHING,
    expected: { outcome: "refused", mustName: ["tags", "list"] },
  },
  {
    name: "a query orders its answer by the key its sort-by names",
    group: "order",
    from: ORDERS_ITS_ANSWER,
    claim: ORDERS_BY,
    query: { pageType: "song", sortBy: "title" },
    declared: DECLARED,
    pages: [
      { at: "cherry", values: { title: text("cherry") } },
      { at: "apple", values: { title: text("apple") } },
      { at: "banana", values: { title: text("banana") } },
    ],
    expected: { outcome: "answers", at: ["apple", "banana", "cherry"] },
    provisional: "text-orders-by-code-point",
  },
  {
    name: "a query stating descending orders from the highest value down",
    group: "order",
    from: HIGHEST_DOWN,
    claim: FROM_HIGHEST,
    query: { pageType: "song", sortBy: "rank", descending: true },
    declared: DECLARED,
    pages: [
      { at: "two", values: { rank: num(2) } },
      { at: "nine", values: { rank: num(9) } },
      { at: "five", values: { rank: num(5) } },
    ],
    expected: { outcome: "answers", at: ["nine", "five", "two"] },
  },
  {
    name: "a number-declared key orders as a number, so nine comes before ten",
    group: "order",
    from: BY_DECLARED_TYPE,
    claim: DECLARED_TYPE,
    query: { pageType: "song", sortBy: "rank" },
    declared: DECLARED,
    pages: [
      { at: "ten", values: { rank: num(10) } },
      { at: "nine", values: { rank: num(9) } },
    ],
    expected: { outcome: "answers", at: ["nine", "ten"] },
  },
  {
    name: "a text-declared key holding digits orders as a text, so ten comes before nine",
    group: "order",
    from: BY_DECLARED_TYPE,
    claim: DECLARED_TYPE,
    query: { pageType: "song", sortBy: "title" },
    declared: DECLARED,
    pages: [
      { at: "nine", values: { title: text("9") } },
      { at: "ten", values: { title: text("10") } },
    ],
    expected: { outcome: "answers", at: ["ten", "nine"] },
    provisional: "text-orders-by-code-point",
  },
  {
    name: "an instant-declared key orders in time",
    group: "order",
    from: BY_DECLARED_TYPE,
    claim: DECLARED_TYPE,
    query: { pageType: "song", sortBy: "played-at", descending: true },
    declared: DECLARED,
    pages: [
      { at: "early", values: { "played-at": when(1000) } },
      { at: "late", values: { "played-at": when(9000) } },
    ],
    expected: { outcome: "answers", at: ["late", "early"] },
  },
  {
    name: "a page holding nothing under the sort key is not ordered against one that holds a value",
    group: "order",
    from: FALLS_ON_NEITHER,
    claim: NEITHER,
    query: { pageType: "song", sortBy: "title" },
    declared: DECLARED,
    pages: [
      { at: "cherry", values: { title: text("cherry") } },
      { at: "nothing", values: {} },
      { at: "apple", values: { title: text("apple") } },
    ],
    expected: { outcome: "answers", at: ["apple", "cherry", "nothing"] },
    provisional: "absent-orders-last",
  },
  {
    name: "a page holding nothing under the sort key stays last when the order is reversed",
    group: "order",
    from: FALLS_ON_NEITHER,
    claim: NEITHER,
    query: { pageType: "song", sortBy: "title", descending: true },
    declared: DECLARED,
    pages: [
      { at: "cherry", values: { title: text("cherry") } },
      { at: "nothing", values: {} },
      { at: "apple", values: { title: text("apple") } },
    ],
    expected: { outcome: "answers", at: ["cherry", "apple", "nothing"] },
    provisional: "absent-orders-last",
  },
  {
    name: "pages holding the same value keep the order they arrived in",
    group: "order",
    from: ORDERS_ITS_ANSWER,
    claim: ORDERS_BY,
    query: { pageType: "song", sortBy: "rank" },
    declared: DECLARED,
    pages: [
      { at: "first", values: { rank: num(1) } },
      { at: "second", values: { rank: num(1) } },
      { at: "third", values: { rank: num(1) } },
    ],
    expected: { outcome: "answers", at: ["first", "second", "third"] },
  },

  // -------------------------------------------------------------------------
  // limit
  // -------------------------------------------------------------------------

  {
    name: "a query answers with no more pages than its limit",
    group: "limit",
    from: HOW_MANY,
    claim: ANSWERS_WITH,
    query: { pageType: "song", limit: 2 },
    declared: DECLARED,
    pages: [
      { at: "one", values: { rank: num(1) } },
      { at: "two", values: { rank: num(2) } },
      { at: "three", values: { rank: num(3) } },
    ],
    expected: { outcome: "answers", at: ["one", "two"] },
  },
  {
    name: "a limit larger than the pages found answers all of them",
    group: "limit",
    from: HOW_MANY,
    claim: ANSWERS_WITH,
    query: { pageType: "song", limit: 99 },
    declared: DECLARED,
    pages: [
      { at: "one", values: { rank: num(1) } },
      { at: "two", values: { rank: num(2) } },
    ],
    expected: { outcome: "answers", at: ["one", "two"] },
  },
  {
    name: "a limit of nought answers no pages, which is what it asked for",
    group: "limit",
    from: HOW_MANY,
    claim: ANSWERS_WITH,
    query: { pageType: "song", limit: 0 },
    declared: DECLARED,
    pages: [{ at: "one", values: { rank: num(1) } }],
    expected: { outcome: "answers", at: [] },
  },
  {
    name: "a limit takes from the front of the order the query asked for",
    group: "limit",
    from: HOW_MANY,
    claim: ANSWERS_WITH,
    query: { pageType: "song", sortBy: "rank", descending: true, limit: 2 },
    declared: DECLARED,
    pages: [
      { at: "two", values: { rank: num(2) } },
      { at: "nine", values: { rank: num(9) } },
      { at: "five", values: { rank: num(5) } },
    ],
    expected: { outcome: "answers", at: ["nine", "five"] },
  },
  {
    name: "a limit fewer than no pages is refused",
    group: "limit",
    from: REFUSED_NOT_DROPPED,
    claim: NOT_DROPPED,
    query: { pageType: "song", limit: -3 },
    declared: DECLARED,
    pages: NOTHING,
    expected: { outcome: "refused", mustName: ["limit", "-3"] },
  },
  {
    name: "a limit that is not a whole number of pages is refused",
    group: "limit",
    from: REFUSED_NOT_DROPPED,
    claim: NOT_DROPPED,
    query: { pageType: "song", limit: 2.5 },
    declared: DECLARED,
    pages: NOTHING,
    expected: { outcome: "refused", mustName: ["limit", "2.5"] },
  },
]
