import { describe, expect, test } from "bun:test"
import {
  chestGivesUp,
  classifyPendingVenue,
  listingHold,
} from "akasha/temper/addon/pages/items/modules/inventory-plan-venue/inventory-plan-venue.module.code.ts"

const craftBagTakes = (): boolean => true

const WEALTH = { chestId: "4676", name: "Wealth" }

describe("An item a rule takes out of a house chest is planned as a withdrawal there.", () => {
  test("a treasure to sell and a mythic bound for the bank are withdrawn by the carrier alone", () => {
    expect(chestGivesUp("sell", undefined, WEALTH, true)).toBe(true)
    expect(chestGivesUp("sell", undefined, WEALTH, false)).toBe(false)
    expect(chestGivesUp("move-to", "bank", WEALTH, true)).toBe(true)
    expect(chestGivesUp("move-to", "bank", WEALTH, false)).toBe(false)
    expect(chestGivesUp("move-to", "house-storage:Crown Items", WEALTH, false)).toBe(false)
  })

  test("an item bound for a character is withdrawn by whoever visits", () => {
    expect(chestGivesUp("move-to", "character:42", WEALTH, false)).toBe(true)
  })

  test("an item already in the chest its rule names stays", () => {
    expect(chestGivesUp("move-to", "house-storage:Wealth", WEALTH, true)).toBe(false)
    expect(chestGivesUp("move-to", "house-storage:4676", WEALTH, true)).toBe(false)
    expect(chestGivesUp("move-to", "house-storage", WEALTH, true)).toBe(false)
  })

  test("an item the chest visit leaves in place is no withdrawal", () => {
    for (const action of ["nothing", "lock", "bind", "stock", "deconstruct", undefined]) {
      expect(chestGivesUp(action, undefined, WEALTH, true)).toBe(false)
    }
  })
})
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

  test("a listing the guild store would skip is held with its reason", () => {
    expect(listingHold(true, 27000)).toBeUndefined()
    expect(listingHold(true, undefined)).toBe("no price")
    expect(listingHold(false, 27000)).toBe("can't be listed")
    expect(
      classifyPendingVenue("list", "character:7", false, craftBagRefuses, "7", () => "no price")
    ).toEqual({ venue: "guild-store", verb: "list", held: "no price" })
    expect(
      classifyPendingVenue("list", "character:7", false, craftBagRefuses, "7", () => undefined)
    ).toEqual({ venue: "guild-store", verb: "list" })
  })

  test("a vendor item for another character is deposited at the bank", () => {
    expect(classifyPendingVenue("list", "character:9", false, craftBagRefuses, "7")).toEqual({
      venue: "bank",
      verb: "deposit",
    })
    expect(classifyPendingVenue("sell", "character:9", false, craftBagRefuses, "7")).toEqual({
      venue: "bank",
      verb: "deposit",
    })
    expect(classifyPendingVenue("sell", "character:7", false, craftBagRefuses, "7")).toEqual({
      venue: "vendor",
      verb: "sell",
    })
  })

  test("a fish to fillet is planned at a crafting station", () => {
    expect(classifyPendingVenue("fillet", undefined, false, craftBagRefuses)).toEqual({
      venue: "crafting-station",
      verb: "fillet",
    })
  })
})
