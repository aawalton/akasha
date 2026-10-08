import type { TemperArmorTrait } from "akasha/temper/catalog/gear/temper-armor-trait/temper-armor-trait.page-type.types.ts"

export const reinforced = {
  id: "01a05fb2-1bd1-7dba-b5ac-0f28ecbae701",
  type: "page-type/temper-armor-trait",
  slug: "reinforced",
  title: "Reinforced",
  key: "reinforced",
  effect: "Increases Armor value",
  material: "Sardonyx",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_REINFORCED",
  displayOrder: 6,
  hashPlace: 6,
  available: true,
  createdAt: "2026-09-02T01:18:23.185Z",
  updatedAt: "2026-09-27T03:41:25.000Z",
} as const satisfies TemperArmorTrait
