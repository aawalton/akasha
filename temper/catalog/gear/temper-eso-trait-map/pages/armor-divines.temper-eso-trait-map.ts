import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const armorDivines = {
  id: "01a05fd7-41c6-768e-a1eb-b4c0f132e852",
  type: "page-type/temper-eso-trait-map",
  slug: "armor-divines",
  title: "Armor Divines",
  key: "armor:divines",
  traitFamily: "armor",
  traitId: "temper-armor-trait/divines",
  esoTraitNum: 18,
  displayOrder: 8,
} as const satisfies TemperEsoTraitMap
