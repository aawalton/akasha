import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const armorNirnhoned = {
  id: "01a05fd7-41c7-7f43-ab1f-6713025a11a0",
  type: "page-type/temper-eso-trait-map",
  slug: "armor-nirnhoned",
  title: "Armor Nirnhoned",
  key: "armor:nirnhoned",
  traitFamily: "armor",
  traitId: "temper-armor-trait/nirnhoned",
  esoTraitNum: 25,
  displayOrder: 11,
} as const satisfies TemperEsoTraitMap
