import { expect, test } from "bun:test"
import { describedAs } from "./tree-description.module.code.ts"

test("a panel under no filter says how many rows it drew", () => {
  expect(describedAs(undefined, 7)).toBe("7 rows")
  expect(describedAs(undefined, 0)).toBe("0 rows")
})

test("one row is said in the singular", () => {
  expect(describedAs(undefined, 1)).toBe("1 row")
})

test("a panel under a filter says how many matched of how many were drawn", () => {
  expect(describedAs(2, 7)).toBe("2 of 7")
})

test("a filter matching none says so rather than falling back to the count", () => {
  expect(describedAs(0, 7)).toBe("0 of 7")
})

test("one row matched is said as a count rather than in the singular", () => {
  expect(describedAs(1, 1)).toBe("1 of 1")
})
