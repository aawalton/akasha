import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const armorInfused = {
  id: "01a05fd7-41c6-7f5e-8499-0bc26716f151",
  type: "page-type/temper-eso-trait-map",
  slug: "armor-infused",
  title: "Armor Infused",
  key: "armor:infused",
  traitFamily: "armor",
  traitId: "temper-armor-trait/infused",
  esoTraitNum: 16,
  displayOrder: 6,
} as const satisfies TemperEsoTraitMap
