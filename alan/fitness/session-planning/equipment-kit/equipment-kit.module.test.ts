import { expect, test } from "bun:test"
import type { EquipmentCategory } from "../../equipment-items/properties/equipment-category.select-property.ts"
import { isInKit, kitCategoryFor, requiresNoImplement } from "./equipment-kit.module.code.ts"

const NOTHING: ReadonlySet<EquipmentCategory> = new Set()
const DUMBBELLS: ReadonlySet<EquipmentCategory> = new Set(["dumbbells"])

test("body-only kit asks for no implement", () => {
  expect(requiresNoImplement("body-only")).toBe(true)
})

test("a movement stating no kit asks for no implement", () => {
  expect(requiresNoImplement(null)).toBe(true)
})

test("a dumbbell is an implement", () => {
  expect(requiresNoImplement("dumbbell")).toBe(false)
})

test("kit with no implement stands for no category", () => {
  expect(kitCategoryFor("body-only")).toBeNull()
  expect(kitCategoryFor(null)).toBeNull()
})

test("each mapped implement names its category", () => {
  expect(kitCategoryFor("dumbbell")).toBe("dumbbells")
  expect(kitCategoryFor("kettlebells")).toBe("kettlebells")
  expect(kitCategoryFor("bands")).toBe("band")
})

test("an implement standing for no category is out of the kit", () => {
  expect(kitCategoryFor("barbell")).toBeNull()
  expect(isInKit("barbell", DUMBBELLS)).toBe(false)
})

test("a movement asking for no implement is in the kit even with nothing to hand", () => {
  expect(isInKit("body-only", NOTHING)).toBe(true)
  expect(isInKit(null, NOTHING)).toBe(true)
})

test("an implement is in the kit only where its category is to hand", () => {
  expect(isInKit("dumbbell", DUMBBELLS)).toBe(true)
  expect(isInKit("kettlebells", DUMBBELLS)).toBe(false)
})
