import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const armorReinforced = {
  id: "01a05fd7-41c8-7780-95f2-686adb821e5a",
  type: "page-type/temper-eso-trait-map",
  slug: "armor-reinforced",
  title: "Armor Reinforced",
  key: "armor:reinforced",
  traitFamily: "armor",
  traitId: "temper-armor-trait/reinforced",
  esoTraitNum: 13,
  displayOrder: 3,
} as const satisfies TemperEsoTraitMap
