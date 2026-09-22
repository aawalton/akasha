import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const armorImpenetrable = {
  id: "01a05fd7-41c6-7820-afdf-c6ced36e73c6",
  type: "page-type/temper-eso-trait-map",
  slug: "armor-impenetrable",
  title: "Armor Impenetrable",
  key: "armor:impenetrable",
  traitFamily: "armor",
  traitId: "temper-armor-trait/impenetrable",
  esoTraitNum: 12,
  displayOrder: 2,
} as const satisfies TemperEsoTraitMap
