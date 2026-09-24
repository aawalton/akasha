import { expect, test } from "bun:test"
import {
  countsTowardHeld,
  craftMakesCategory,
  craftShortfallTarget,
  craftsToFill,
  firstUnmetPassive,
  heldAccountWide,
  passiveRefusal,
  resolverForStation,
} from "akasha/temper/addon/pages/items/modules/inventory-craft-shortfall-plan/inventory-craft-shortfall-plan.module.code.ts"
import type { DestinationChain } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"

const MARA: DestinationChain = [
  { destination: "character:by-priority", targetQuantity: 20 },
  { destination: "bank", targetQuantity: 100 },
  { destination: "house-storage:4675" },
]

const CURRENT = "8798292093127842"

const ANCESTORS: Readonly<Record<string, readonly string[]>> = {
  drink: ["drink", "consumables", "all"],
  "drink-alcoholic": ["drink-alcoholic", "drink", "consumables", "all"],
  food: ["food", "consumables", "all"],
  potions: ["potions", "consumables", "all"],
  poisons: ["poisons", "consumables", "all"],
  consumables: ["consumables", "all"],
  weapons: ["weapons", "equipment", "all"],
}

function ancestorsOf(id: string): readonly string[] {
  return ANCESTORS[id] ?? [id, "all"]
}

test("the target is the by-priority leg for each character it takes and each capped leg after", () => {
  expect(craftShortfallTarget(MARA, 20)).toBe(500)
  expect(craftShortfallTarget(MARA, 1)).toBe(120)
})

test("a leg with no quantity adds nothing to the target", () => {
  expect(
    craftShortfallTarget([{ destination: "character:by-priority", targetQuantity: 5 }], 3)
  ).toBe(15)
})

test("a leg before the by-priority leg adds nothing to the target", () => {
  const chain: DestinationChain = [
    { destination: "bank", targetQuantity: 999 },
    { destination: "character:by-priority", targetQuantity: 10 },
  ]
  expect(craftShortfallTarget(chain, 2)).toBe(20)
})

test("a chain with no by-priority leg, or no chain, has no target", () => {
  expect(craftShortfallTarget([{ destination: "bank", targetQuantity: 100 }], 20)).toBe(undefined)
  expect(craftShortfallTarget(undefined, 20)).toBe(undefined)
})

test("other characters and house storage count as saved; the current character and bank do not", () => {
  expect(countsTowardHeld("1234567890", CURRENT)).toBe(true)
  expect(countsTowardHeld("HouseBank:Storage Chest", CURRENT)).toBe(true)
  expect(countsTowardHeld("FurnitureVault", CURRENT)).toBe(true)
  expect(countsTowardHeld(CURRENT, CURRENT)).toBe(false)
  expect(countsTowardHeld("Bank", CURRENT)).toBe(false)
  expect(countsTowardHeld("CraftBag", CURRENT)).toBe(false)
  expect(countsTowardHeld("Companion:Mirri", CURRENT)).toBe(false)
  expect(countsTowardHeld("House:Grand Topal", CURRENT)).toBe(false)
  expect(countsTowardHeld("Some Trading Guild", CURRENT)).toBe(false)
})

test("held is the live character and bank beside every saved place that counts", () => {
  const held = heldAccountWide(
    10,
    50,
    [
      { locationKey: "1111111111", count: 40 },
      { locationKey: "2222222222", count: 25 },
      { locationKey: "HouseBank:Storage Coffer", count: 5 },
      { locationKey: CURRENT, count: 999 },
      { locationKey: "Bank", count: 999 },
      { locationKey: "Some Trading Guild", count: 999 },
    ],
    CURRENT
  )
  expect(held).toBe(130)
})

test("a 500 target with 130 held crafts whole crafts yielding at least the 370 short", () => {
  const target = craftShortfallTarget(MARA, 20) ?? 0
  const held = heldAccountWide(10, 50, [{ locationKey: "1111111111", count: 70 }], CURRENT)
  expect(target - held).toBe(370)
  const crafts = craftsToFill(target, held, 4, 1000)
  expect(crafts).toBe(93)
  expect(crafts * 4).toBe(372)
  expect(craftsToFill(target, held, 1, 1000)).toBe(370)
})

test("the crafts made never exceed what the materials on hand allow", () => {
  expect(craftsToFill(500, 130, 4, 40)).toBe(40)
  expect(craftsToFill(500, 130, 4, 0)).toBe(0)
})

test("nothing is crafted where the account holds the target or more", () => {
  expect(craftsToFill(500, 500, 4, 1000)).toBe(0)
  expect(craftsToFill(500, 620, 4, 1000)).toBe(0)
})

test("the first passive short of its rank is the one named", () => {
  const needs = [
    { passive: "Brewer", have: 3, need: 3 },
    { passive: "Recipe Improvement", have: 5, need: 6 },
    { passive: "Recipe Quality", have: 2, need: 4 },
  ]
  expect(firstUnmetPassive(needs)?.passive).toBe("Recipe Improvement")
  expect(firstUnmetPassive([{ passive: "Chemistry", have: 3, need: 3 }])).toBe(undefined)
})

test("a refusal names the rule, the passive, the rank held and the rank needed", () => {
  const said = passiveRefusal("rule 83678d83", { passive: "Brewer", have: 2, need: 3 })
  expect(said).toContain("rule 83678d83")
  expect(said).toContain("Brewer is rank 2")
  expect(said).toContain("needs rank 3")
})

test("a station is served by the one resolver naming its craft", () => {
  const resolvers = [
    { craftType: 4, categoryIds: ["potions", "poisons"], name: "alchemy" },
    { craftType: 5, categoryIds: ["food", "drink"], name: "provisioning" },
  ]
  expect(resolverForStation(resolvers, 5)?.name).toBe("provisioning")
  expect(resolverForStation(resolvers, 4)?.name).toBe("alchemy")
  expect(resolverForStation(resolvers, 1)).toBe(undefined)
})

test("a craft makes a rule's items at, above or below the craft's own categories", () => {
  const provisioning = ["food", "drink"]
  expect(craftMakesCategory("drink", provisioning, ancestorsOf)).toBe(true)
  expect(craftMakesCategory("drink-alcoholic", provisioning, ancestorsOf)).toBe(true)
  expect(craftMakesCategory("consumables", provisioning, ancestorsOf)).toBe(true)
  expect(craftMakesCategory("potions", provisioning, ancestorsOf)).toBe(false)
  expect(craftMakesCategory("weapons", provisioning, ancestorsOf)).toBe(false)
  expect(craftMakesCategory("potions", ["potions", "poisons"], ancestorsOf)).toBe(true)
})
