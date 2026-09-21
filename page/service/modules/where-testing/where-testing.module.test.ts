import { expect, test } from "bun:test"
import {
  bare,
  matches,
  meets,
  narrows,
  unrun,
  weigh,
} from "akasha/page/service/modules/where-testing/where-testing.module.code.ts"

test("a value holding nothing reads as bare", () => {
  expect(bare(undefined)).toBe(true)
  expect(bare(null)).toBe(true)
  expect(bare("")).toBe(true)
  expect(bare("a")).toBe(false)
})

test("a list holding nothing reads as bare", () => {
  expect(bare([])).toBe(true)
  expect(bare(["a"])).toBe(false)
})

test("a test is run by the name a where states", () => {
  expect(matches("a", "is", "a")).toBe(true)
  expect(matches(["a"], "has", "a")).toBe(true)
  expect(matches("abc", "starts-with", "ab")).toBe(true)
  expect(matches("abc", "ends-with", "bc")).toBe(true)
  expect(matches("abc", "contains", "b")).toBe(true)
  expect(matches("a", "in", ["a", "b"])).toBe(true)
  expect(matches("c", "not-in", ["a", "b"])).toBe(true)
  expect(matches("", "empty", true)).toBe(true)
})

test("a name naming no test answers false", () => {
  expect(matches("a", "sounds-like", "a")).toBe(false)
})

test("an ordering test answers false over a value that reads as bare", () => {
  expect(matches(null, "after", "2026-01-01")).toBe(false)
  expect(matches(null, "before", "2026-01-01")).toBe(false)
  expect(matches(null, "at-or-after", "2026-01-01")).toBe(false)
  expect(matches(null, "at-or-before", "2026-01-01")).toBe(false)
})

test("two values order as numbers where both are numbers", () => {
  expect(matches(3, "after", 2)).toBe(true)
  expect(matches(2, "at-or-after", 2)).toBe(true)
})

test("two values order as instants where both parse as one", () => {
  expect(matches("2026-02-01", "after", "2026-01-01")).toBe(true)
  expect(matches("2026-01-01", "before", "2026-02-01")).toBe(true)
})

test("two values order as text otherwise", () => {
  expect(matches("b", "after", "a")).toBe(true)
  expect(matches("a", "before", "b")).toBe(true)
})

test("a sort weighs text by the locale's order", () => {
  expect(weigh(1, 2)).toBeLessThan(0)
  expect(weigh("a", "b")).toBeLessThan(0)
  expect(weigh(null, null)).toBe(0)
})

test("an ordering test reads two instants as instants", () => {
  const held = { at: "2026-08-30T12:00:00Z" }
  expect(meets(held, "at", { "at-or-after": "2026-08-30" })).toBe(true)
  expect(meets(held, "at", { before: "2026-08-01" })).toBe(false)
  expect(meets(held, "at", { before: "2026-09-01" })).toBe(true)
})

test("an ordering test reads two numbers as numbers", () => {
  expect(meets({ n: 9 }, "n", { before: 10 })).toBe(true)
  expect(meets({ n: 9 }, "n", { before: 5 })).toBe(false)
})

test("an ordering test over nothing held keeps nothing", () => {
  expect(meets({}, "at", { before: "2026-09-01" })).toBe(false)
})

test("a key a value has nothing for reads as bare", () => {
  expect(meets({}, "at", { empty: true })).toBe(true)
  expect(meets({}, "at", { "not-in": ["a"] })).toBe(true)
})

test("every test on every key holds before a value narrows", () => {
  expect(narrows({ a: "one", b: "two" }, { a: { is: "one" }, b: { is: "two" } })).toBe(true)
  expect(narrows({ a: "one", b: "two" }, { a: { is: "one" }, b: { is: "three" } })).toBe(false)
  expect(narrows({ a: "one" }, undefined)).toBe(true)
})

test("a name naming no test is refused rather than dropped", () => {
  expect(unrun({ slug: { is: "gap" } })).toBeNull()
  expect(unrun(undefined)).toBeNull()
  expect(unrun({ slug: {} })).toContain("states no test")
  expect(unrun({ slug: { sounds: "gap" } } as never)).toContain("is no test this runs")
})
