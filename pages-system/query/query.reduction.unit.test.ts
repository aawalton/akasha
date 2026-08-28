import { expect, test } from "bun:test"
import {
  type Checked,
  checkQuery,
  type Declared,
  type Query,
} from "./query.ts"

const TEXT = { kind: "text" } as const
const NUMBER = { kind: "number" } as const
const BOOLEAN = { kind: "boolean" } as const

const declaredOf = (
  extra: Declared["properties"] = {},
  beyond: Record<string, string> = {}
): Declared => ({ properties: { slug: { type: TEXT }, id: { type: TEXT }, ...extra }, beyond })

const checked = (query: Query, declared: Declared = declaredOf()): Checked => {
  const answer = checkQuery(query, declared)
  if (!answer.ok) throw new Error(`refused: ${answer.message}`)
  return answer
}

const refusalOf = (query: Query, declared: Declared = declaredOf()): string => {
  const answer = checkQuery(query, declared)
  if (answer.ok) throw new Error("checked")
  return answer.message
}

test("a query stating a function and no target is refused rather than answering pages", () => {
  expect(refusalOf({ pageType: "episode", function: "sum" })).toBe(
    "a query stating a `function` states the key it reduces, and this one states no `target`"
  )
})

test("a query stating a target and no function is refused rather than answering pages", () => {
  expect(refusalOf({ pageType: "episode", target: "length" })).toBe(
    "a query stating a `target` states how it reduces it, and this one states no `function`"
  )
})

test("a target no page type asked about declares is refused, naming it", () => {
  expect(refusalOf({ pageType: "episode", function: "sum", target: "length" })).toBe(
    "no page type this asks about declares `length`"
  )
})

test("a target declared to hold what no reduction reduces is refused saying what it holds", () => {
  const declared = declaredOf({}, { "turn-end-decisions": "pages" })
  expect(
    refusalOf({ pageType: "seat", function: "sum", target: "turn-end-decisions" }, declared)
  ).toBe("`turn-end-decisions` is declared to hold `pages`, which no reduction reduces")
})

test("a target declared a text is refused rather than reduced over whatever its pages hold", () => {
  const declared = declaredOf({ v: { type: TEXT } })
  expect(refusalOf({ pageType: "run", function: "sum", target: "v" }, declared)).toBe(
    "a reduction reduces a number, and `v` holds a text"
  )
})

test("a target declared a boolean is refused, a count of trues being a different question", () => {
  const declared = declaredOf({ "on-call": { type: BOOLEAN } })
  expect(refusalOf({ pageType: "seat", function: "mean", target: "on-call" }, declared)).toBe(
    "a reduction reduces a number, and `on-call` holds a boolean"
  )
})

test("a checked query carries what it reduces", () => {
  const declared = declaredOf({ length: { type: NUMBER } })
  const query = checked({ pageType: "episode", function: "mean", target: "length" }, declared)
  expect(query.reduction).toEqual({ how: "mean", target: "length" })
})

test("a query stating no reduction carries none, so a caller can tell it answers pages", () => {
  expect(checked({ pageType: "seat" }).reduction).toBeNull()
})

test("a reduction and a where stand together on one query", () => {
  const declared = declaredOf({ length: { type: NUMBER }, "on-call": { type: BOOLEAN } })
  const query = checked(
    { pageType: "episode", where: "{on-call}", function: "sum", target: "length" },
    declared
  )
  expect(query.reduction).toEqual({ how: "sum", target: "length" })
})

test("a reduction is refused at checking, in the terms the query was written in", () => {
  const answer = checkQuery({ pageType: "episode", function: "sum" }, declaredOf())
  if (answer.ok) throw new Error("checked")
  expect(answer.moment).toBe("checking")
})

test("a reduction is refused before the where is read, as the keys are", () => {
  const declared = declaredOf({ length: { type: NUMBER } })
  expect(refusalOf({ pageType: "episode", where: "{slug", function: "sum" }, declared)).toBe(
    "a query stating a `function` states the key it reduces, and this one states no `target`"
  )
})
