import { expect, test } from "bun:test"
import type { Value, Values } from "../formula/formula.ts"
import { type Checked, checkQuery, type Declared, type Page, type Query } from "./query.ts"
import { reducedFor, reducedOf, runReduction } from "./reduce.ts"

const pageOf = (at: string, properties: Record<string, Value>): Page => ({
  at,
  values: { now: 0, properties } satisfies Values,
})

const number = (of: number): Value => ({ kind: "number", number: of })
const text = (of: string): Value => ({ kind: "text", text: of })

const ABSENT: Value = { kind: "absent" }

const three = [
  pageOf("a", { length: number(3) }),
  pageOf("b", { length: number(4) }),
  pageOf("c", { length: number(5) }),
]

test("a sum over no pages answers absent rather than nought", () => {
  expect(reducedOf([], "length", "sum")).toEqual({ value: ABSENT, over: 0 })
})

test("a mean over no pages answers absent rather than nought", () => {
  expect(reducedOf([], "length", "mean")).toEqual({ value: ABSENT, over: 0 })
})

test("a sum over pages none of which hold the target answers absent rather than nought", () => {
  const pages = [pageOf("a", { slug: text("a") }), pageOf("b", { slug: text("b") })]
  expect(reducedOf(pages, "length", "sum")).toEqual({ value: ABSENT, over: 0 })
})

test("a reduction over pages that do hold nought answers nought, not absent", () => {
  const pages = [pageOf("a", { length: number(0) }), pageOf("b", { length: number(0) })]
  expect(reducedOf(pages, "length", "sum")).toEqual({ value: number(0), over: 2 })
})

test("an answer carrying a value says how many pages that value was taken over", () => {
  expect(reducedOf(three, "length", "sum")).toEqual({ value: number(12), over: 3 })
})

test("a mean is the total over how many pages held a number", () => {
  expect(reducedOf(three, "length", "mean")).toEqual({ value: number(4), over: 3 })
})

test("a mean that does not divide whole is not rounded", () => {
  const pages = [pageOf("a", { length: number(1) }), pageOf("b", { length: number(2) })]
  expect(reducedOf(pages, "length", "mean")).toEqual({ value: number(1.5), over: 2 })
})

test("a page holding nothing under the target does not contribute and is not a fault", () => {
  const pages = [
    pageOf("a", { length: number(10) }),
    pageOf("b", { slug: text("b") }),
    pageOf("c", { length: number(20) }),
  ]
  expect(reducedOf(pages, "length", "sum")).toEqual({ value: number(30), over: 2 })
})

test("a page holding absent under the target does not contribute", () => {
  const pages = [pageOf("a", { length: number(10) }), pageOf("b", { length: ABSENT })]
  expect(reducedOf(pages, "length", "sum")).toEqual({ value: number(10), over: 1 })
})

test("a mean is taken over the pages that held a number, never over every page found", () => {
  const pages = [
    pageOf("a", { length: number(3) }),
    pageOf("b", { slug: text("b") }),
    pageOf("c", { length: number(5) }),
  ]
  expect(reducedOf(pages, "length", "mean")).toEqual({ value: number(4), over: 2 })
})

test("a value that is not a number does not contribute", () => {
  const pages = [pageOf("a", { length: number(7) }), pageOf("b", { length: text("9") })]
  expect(reducedOf(pages, "length", "sum")).toEqual({ value: number(7), over: 1 })
})

test("every target asked for is answered, over none where no page held one", () => {
  const found = reducedFor(three, ["length", "weight"], "sum")
  expect([...found.keys()].sort()).toEqual(["length", "weight"])
  expect(found.get("weight")).toEqual({ value: ABSENT, over: 0 })
})

test("each target is reduced over its own pages rather than over one shared count", () => {
  const pages = [
    pageOf("a", { length: number(2), weight: number(100) }),
    pageOf("b", { length: number(6) }),
  ]
  const found = reducedFor(pages, ["length", "weight"], "sum")
  expect(found.get("length")).toEqual({ value: number(8), over: 2 })
  expect(found.get("weight")).toEqual({ value: number(100), over: 1 })
})

test("what the singular answers is what the plural asked for one answers", () => {
  for (const how of ["sum", "mean"] as const) {
    for (const target of ["length", "weight"]) {
      expect(reducedOf(three, target, how)).toEqual(
        reducedFor(three, [target], how).get(target) as unknown as never
      )
    }
  }
})

test("a call naming no target answers nothing", () => {
  expect(reducedFor(three, [], "sum").size).toBe(0)
})

test("a target named twice is answered once", () => {
  const found = reducedFor(three, ["length", "length"], "sum")
  expect(found.size).toBe(1)
  expect(found.get("length")).toEqual({ value: number(12), over: 3 })
})

test("reducing reads the pages and changes none of them", () => {
  const pages = [pageOf("a", { length: number(3) })]
  reducedFor(pages, ["length"], "sum")
  expect(pages[0]?.values.properties["length"]).toEqual(number(3))
})

const declaredLength: Declared = { properties: { length: { type: { kind: "number" } } }, beyond: {} }

const checkedOf = (query: Query): Checked => {
  const answer = checkQuery(query, declaredLength)
  if (!answer.ok) throw new Error(`refused: ${answer.message}`)
  return answer
}

test("a query that states no reduction answers null rather than a value", () => {
  expect(runReduction(checkedOf({ pageType: "episode" }), three)).toBeNull()
})

test("a reduction runs over the pages it is handed", () => {
  const query = checkedOf({ pageType: "episode", function: "sum", target: "length" })
  expect(runReduction(query, three)).toEqual({ value: number(12), over: 3 })
})

test("a reduction over pages the query found none of answers absent over nought", () => {
  const query = checkedOf({ pageType: "episode", function: "sum", target: "length" })
  expect(runReduction(query, [])).toEqual({ value: ABSENT, over: 0 })
})

test("a query reducing nothing and a reduction finding nothing are not one answer", () => {
  const reduces = checkedOf({ pageType: "episode", function: "mean", target: "length" })
  const does_not = checkedOf({ pageType: "episode" })
  expect(runReduction(does_not, three)).toBeNull()
  expect(runReduction(reduces, [])).toEqual({ value: ABSENT, over: 0 })
})

test("what a reduction runs over is what the query answered, never the pages as they were read", () => {
  const query = checkedOf({ pageType: "episode", function: "sum", target: "length" })
  expect(runReduction(query, three.slice(0, 2))).toEqual({ value: number(7), over: 2 })
})
