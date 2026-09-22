import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const armorWellFitted = {
  id: "01a05fd7-41c9-71c0-a0be-0caa302d9464",
  type: "page-type/temper-eso-trait-map",
  slug: "armor-well-fitted",
  title: "Armor Well-Fitted",
  key: "armor:well-fitted",
  traitFamily: "armor",
  traitId: "temper-armor-trait/well-fitted",
  esoTraitNum: 14,
  displayOrder: 4,
} as const satisfies TemperEsoTraitMap
