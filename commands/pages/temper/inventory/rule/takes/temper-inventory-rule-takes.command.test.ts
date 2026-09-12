import { expect, test } from "bun:test"
import {
  gatheredByItem,
  ordered,
  type RuleTakes,
  takerOf,
  takesSaid,
} from "akasha/commands/pages/temper/inventory/rule/takes/temper-inventory-rule-takes.command.code.ts"
import type { AffectedItem } from "akasha/temper/items-rules-core/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"

function affected(
  itemId: number,
  itemName: string,
  stackCount: number,
  quantity?: number
): AffectedItem {
  return {
    item: {
      itemId,
      itemName,
      itemLink: "",
      quality: 1,
      filterType: 1,
      itemType: 1,
      traitType: 0,
      requiredLevel: 1,
      requiredCP: 0,
      stackCount,
    },
    locationKey: "1",
    locationDisplayName: "Backpack",
    bagId: 1,
    alreadyAtDestination: false,
    ...(quantity === undefined ? {} : { quantity }),
  }
}

test("stacks of one item are gathered into one entry", () => {
  const held = gatheredByItem([affected(7, "Rosin", 3), affected(7, "Rosin", 4)])
  expect(held.get(7)?.units).toBe(7)
  expect(held.size).toBe(1)
})

test("a stack the matcher gave a quantity counts that quantity rather than the whole stack", () => {
  const held = gatheredByItem([affected(7, "Rosin", 200, 5)])
  expect(held.get(7)?.units).toBe(5)
})

test("the entries are given most items first and by name where the counts tie", () => {
  const held = gatheredByItem([
    affected(1, "Beta", 2),
    affected(2, "Alpha", 2),
    affected(3, "Big", 9),
  ])
  expect(ordered(held).map((one) => one.itemName)).toEqual(["Big", "Alpha", "Beta"])
})

test("the taker of an item is the first rule in the order that holds it, and never the rule asking", () => {
  const ruleMap = new Map([
    ["mine", [affected(7, "Rosin", 1)]],
    ["above", [affected(7, "Rosin", 1)]],
    ["below", [affected(7, "Rosin", 1)]],
  ])
  expect(takerOf(ruleMap, ["above", "mine", "below"], "mine", 7)).toBe("above")
  expect(takerOf(ruleMap, ["mine", "below"], "mine", 7)).toBe("below")
})

test("an item no other rule holds has no taker", () => {
  const ruleMap = new Map([["mine", [affected(7, "Rosin", 1)]]])
  expect(takerOf(ruleMap, ["mine"], "mine", 7)).toBeNull()
})

const NOTHING: RuleTakes = {
  ruleId: "probe",
  categoryId: "equipment",
  action: "sell",
  destination: null,
  taken: [],
  shadowed: [],
}

test("a rule taking nothing says so and names no items", () => {
  const said = takesSaid(NOTHING).join("\n")
  expect(said).toContain("takes nothing")
  expect(said).not.toContain("shadowed")
})

test("a rule taking items names the count, the kinds and each item", () => {
  const said = takesSaid({
    ...NOTHING,
    destination: "bank",
    taken: [{ itemId: 7, itemName: "Rosin", units: 7 }],
  }).join("\n")
  expect(said).toContain("→ bank")
  expect(said).toContain("takes 7 item(s) of 1 kind(s)")
  expect(said).toContain("Rosin ×7")
})

test("a shadowed item names the rule that took it", () => {
  const said = takesSaid({
    ...NOTHING,
    shadowed: [{ itemId: 7, itemName: "Rosin", units: 2, takenBy: "legendary-nothing" }],
  }).join("\n")
  expect(said).toContain("shadowed — 2 item(s)")
  expect(said).toContain("Rosin ×2 — legendary-nothing")
})
