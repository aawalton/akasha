import { describe, expect, test } from "bun:test"
import { stockGroupKey } from "akasha/temper/addon/pages/items/modules/inventory-stock-group/inventory-stock-group.module.code.ts"

describe("inventory-stock-group", () => {
  test("a stock an ordered rule set is grouped by that rule", () => {
    expect(stockGroupKey(25, 224302)).toBe(25)
    expect(stockGroupKey(0, 224302)).toBe(0)
  })

  test("a stock an item rule set is grouped by its item", () => {
    expect(stockGroupKey(undefined, 120763)).toBe(120763)
    expect(stockGroupKey(-1, 87697)).toBe(87697)
  })
})
