import { describe, expect, test } from "bun:test"
import { classifyPendingVenue } from "akasha/temper/addon/pages/items/modules/inventory-plan-venue/inventory-plan-venue.module.code.ts"

const craftBagTakes = (): boolean => true
const craftBagRefuses = (): boolean => false

describe("inventory-plan-venue", () => {
  test("an item the craft bag takes is planned for the bank", () => {
    expect(classifyPendingVenue("move-to", "craft-bag", false, craftBagTakes)).toEqual({
      venue: "bank",
      verb: "deposit",
    })
  })

  test("an item the craft bag refuses is in no plan", () => {
    expect(classifyPendingVenue("move-to", "craft-bag", false, craftBagRefuses)).toBeUndefined()
    expect(classifyPendingVenue("stock", "craft-bag", false, craftBagRefuses)).toBeUndefined()
  })

  test("the craft bag is asked only about an item headed for the craft bag", () => {
    let asked = 0
    const counting = (): boolean => {
      asked += 1
      return false
    }
    expect(classifyPendingVenue("move-to", "bank", false, counting)).toEqual({
      venue: "bank",
      verb: "deposit",
    })
    expect(classifyPendingVenue("sell", undefined, false, counting)).toEqual({
      venue: "vendor",
      verb: "sell",
    })
    expect(asked).toBe(0)
  })

  test("an item for another character is withdrawn there and a stock is stocked", () => {
    expect(classifyPendingVenue("move-to", "character:42", false, craftBagRefuses)).toEqual({
      venue: "bank",
      verb: "withdraw",
    })
    expect(classifyPendingVenue("stock", undefined, false, craftBagRefuses)).toEqual({
      venue: "bank",
      verb: "stock",
    })
  })

  test("a house chest keeps its own venue and a stolen item is destroyed at the fence", () => {
    expect(classifyPendingVenue("move-to", "house-storage:4675", false, craftBagRefuses)).toEqual({
      venue: "house-storage:4675",
      verb: "deposit",
    })
    expect(classifyPendingVenue("destroy", undefined, true, craftBagRefuses)).toEqual({
      venue: "fence",
      verb: "destroy",
    })
  })
})
