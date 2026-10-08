import type { TemperArmorTrait } from "akasha/temper/catalog/gear/temper-armor-trait/temper-armor-trait.page-type.types.ts"

export const infused = {
  id: "01a05fb2-1bcf-740b-839d-2f0819a8a7ad",
  type: "page-type/temper-armor-trait",
  slug: "infused",
  title: "Infused",
  key: "infused",
  effect: "Increases Armor Enchantment effect",
  material: "Bloodstone",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_INFUSED",
  displayOrder: 3,
  hashPlace: 3,
  available: true,
  createdAt: "2026-09-02T01:18:23.183Z",
  updatedAt: "2026-09-27T03:41:25.000Z",
} as const satisfies TemperArmorTrait
