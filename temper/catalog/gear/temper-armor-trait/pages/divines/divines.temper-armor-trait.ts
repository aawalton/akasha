import type { TemperArmorTrait } from "akasha/temper/catalog/gear/temper-armor-trait/temper-armor-trait.page-type.types.ts"

export const divines = {
  id: "01a05fb2-1bcd-7a96-a41e-bbf2b55ec3ec",
  type: "page-type/temper-armor-trait",
  slug: "divines",
  title: "Divines",
  key: "divines",
  effect: "Increases Mundus Stone effect",
  material: "Sapphire",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_DIVINES",
  displayOrder: 1,
  hashPlace: 1,
  available: true,
  createdAt: "2026-09-02T01:18:23.181Z",
  updatedAt: "2026-09-27T03:41:25.000Z",
} as const satisfies TemperArmorTrait
