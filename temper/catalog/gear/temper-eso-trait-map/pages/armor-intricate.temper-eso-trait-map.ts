import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const armorIntricate = {
  id: "01a05fd7-41c7-71e0-b421-0946ded36797",
  type: "page-type/temper-eso-trait-map",
  slug: "armor-intricate",
  title: "Armor Intricate",
  key: "armor:intricate",
  traitFamily: "armor",
  traitId: "temper-armor-trait/intricate",
  esoTraitNum: 20,
  displayOrder: 10,
} as const satisfies TemperEsoTraitMap
