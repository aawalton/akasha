import type { Value } from "../../formula/formula.ts"
import type { Declared, Query } from "../query.ts"

export type Citation = { readonly page: string; readonly line: number }

export const citationText = (from: Citation): string => `${from.page}:${from.line}`

export type Provisional =
  | "text-orders-by-code-point"
  | "absent-orders-last"

export type Outcome =
  | { readonly outcome: "refused"; readonly mustName: readonly string[] }
  | { readonly outcome: "answers"; readonly at: readonly string[] }

export type CaseGroup = "order" | "limit" | "offset"

export interface QueryCase {
  readonly name: string
  readonly group: CaseGroup
  readonly from: Citation
  readonly claim: string
  readonly query: Query
  readonly declared: Declared
  readonly pages: readonly { readonly at: string; readonly values: Record<string, Value> }[]
  readonly expected: Outcome
  readonly provisional?: Provisional
}

export const text = (value: string): Value => ({ kind: "text", text: value })
export const num = (value: number): Value => ({ kind: "number", number: value })
export const when = (value: number): Value => ({ kind: "instant", instant: value })

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

const PASSES_OVER: Citation = {
  page: "pages/page-property-definition/page-query-offset.page-property-definition.md",
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
const PASSES_BEFORE =
  "Page query offset — how many pages a page query passes over before the ones it answers with."

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
    name: "a sort-by outside the keys asked for still orders the answer",
    group: "order",
    from: ORDERS_ITS_ANSWER,
    claim: ORDERS_BY,
    query: { pageType: "song", sortBy: "rank", keys: ["title"] },
    declared: DECLARED,
    pages: [
      { at: "three", values: { rank: num(3), title: text("c") } },
      { at: "one", values: { rank: num(1), title: text("a") } },
      { at: "two", values: { rank: num(2), title: text("b") } },
    ],
    expected: { outcome: "answers", at: ["one", "two", "three"] },
  },
  {
    name: "a query passes over as many pages as its offset",
    group: "offset",
    from: PASSES_OVER,
    claim: PASSES_BEFORE,
    query: { pageType: "song", sortBy: "rank", offset: 1 },
    declared: DECLARED,
    pages: [
      { at: "one", values: { rank: num(1) } },
      { at: "two", values: { rank: num(2) } },
      { at: "three", values: { rank: num(3) } },
    ],
    expected: { outcome: "answers", at: ["two", "three"] },
  },
  {
    name: "an offset passes over pages before a limit counts, so the two name a window",
    group: "offset",
    from: PASSES_OVER,
    claim: PASSES_BEFORE,
    query: { pageType: "song", sortBy: "rank", offset: 1, limit: 1 },
    declared: DECLARED,
    pages: [
      { at: "one", values: { rank: num(1) } },
      { at: "two", values: { rank: num(2) } },
      { at: "three", values: { rank: num(3) } },
    ],
    expected: { outcome: "answers", at: ["two"] },
  },
  {
    name: "an offset past every page found answers none",
    group: "offset",
    from: PASSES_OVER,
    claim: PASSES_BEFORE,
    query: { pageType: "song", offset: 9 },
    declared: DECLARED,
    pages: [{ at: "one", values: { rank: num(1) } }],
    expected: { outcome: "answers", at: [] },
  },
  {
    name: "an offset fewer than no pages is refused",
    group: "offset",
    from: REFUSED_NOT_DROPPED,
    claim: NOT_DROPPED,
    query: { pageType: "song", offset: -3 },
    declared: DECLARED,
    pages: NOTHING,
    expected: { outcome: "refused", mustName: ["offset", "-3"] },
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
