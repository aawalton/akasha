import { expect, test } from "bun:test"
import { InventoryRuleSettingsShape } from "./inventory-rule-settings-shape.module.code.ts"

const ONE_RULE = {
  version: 2,
  rules: [{ id: "a", categoryId: "weapons", action: "sell" }],
}

test("settings carrying one rule are read", () => {
  const held = InventoryRuleSettingsShape.parse(ONE_RULE)
  expect(held.rules[0]?.id).toBe("a")
})

test("a version other than two is refused", () => {
  expect(() => InventoryRuleSettingsShape.parse({ ...ONE_RULE, version: 1 })).toThrow()
})

test("a rule carrying an action nobody declares is refused", () => {
  expect(() =>
    InventoryRuleSettingsShape.parse({
      version: 2,
      rules: [{ id: "a", categoryId: "weapons", action: "burn" }],
    })
  ).toThrow()
})

test("a key written by a newer temper is carried through rather than refused", () => {
  const held = InventoryRuleSettingsShape.parse({
    version: 2,
    rules: [{ id: "a", categoryId: "weapons", action: "sell", laterKey: 9 }],
    laterSlice: { anything: true },
  })
  expect((held as Record<string, unknown>).laterSlice).toEqual({ anything: true })
  expect((held.rules[0] as Record<string, unknown>).laterKey).toBe(9)
})

test("item rules and buy rules are read where they are there", () => {
  const held = InventoryRuleSettingsShape.parse({
    version: 2,
    rules: [],
    itemRules: [{ id: "i", itemId: 1, itemName: "Rope", action: "lock" }],
    buyRules: [{ id: "b", itemId: 2, itemName: "Soup", targetQuantity: 4, source: "merchant" }],
  })
  expect(held.itemRules?.[0]?.itemName).toBe("Rope")
  expect(held.buyRules?.[0]?.targetQuantity).toBe(4)
})

test("a buy rule from a source nobody declares is refused", () => {
  expect(() =>
    InventoryRuleSettingsShape.parse({
      version: 2,
      rules: [],
      buyRules: [{ id: "b", itemId: 2, itemName: "Soup", targetQuantity: 4, source: "guild" }],
    })
  ).toThrow()
})
