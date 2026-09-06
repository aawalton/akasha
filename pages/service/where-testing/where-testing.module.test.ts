import { expect, test } from "bun:test"
import { bare, matches, weigh } from "./where-testing.module.code.ts"

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
