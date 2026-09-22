import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const armorSturdy = {
  id: "01a05fd7-41c9-7ce8-966d-65610fe2c9e9",
  type: "page-type/temper-eso-trait-map",
  slug: "armor-sturdy",
  title: "Armor Sturdy",
  key: "armor:sturdy",
  traitFamily: "armor",
  traitId: "temper-armor-trait/sturdy",
  esoTraitNum: 11,
  displayOrder: 1,
} as const satisfies TemperEsoTraitMap
