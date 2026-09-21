import { expect, test } from "bun:test"
import { recordsIn } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  balanceOf,
  pointsIn,
} from "akasha/product/kofi/contribution-point/modules/balance/contribution-point-balance.module.code.ts"

const AT = "2026-09-21T00:00:00.000Z"

test("a balance is every transaction added up", () => {
  expect(
    balanceOf([
      { at: AT, points: 500 },
      { at: AT, points: -100 },
      { at: AT, points: -50 },
    ])
  ).toBe(350)
})

test("a contributor with no transaction holds nothing", () => {
  expect(balanceOf([])).toBe(0)
})

test("points that are no whole number add nothing", () => {
  expect(balanceOf([{ at: AT, points: 100 }, { at: AT, points: 1.5 }, { at: AT }])).toBe(100)
  expect(pointsIn("100")).toBe(0)
})

test("a balance is read off the lines `recordsIn` answers", () => {
  expect(balanceOf(recordsIn(null))).toBe(0)
  expect(balanceOf(recordsIn("jsonl"))).toBe(0)
  expect(balanceOf(recordsIn([{ at: AT, points: 7 }, null, ["one"]]))).toBe(7)
})
