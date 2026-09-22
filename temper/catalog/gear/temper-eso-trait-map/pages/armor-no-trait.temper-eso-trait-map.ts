import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const armorNoTrait = {
  id: "01a05fd7-41c8-744b-a743-027b1b5aa646",
  type: "page-type/temper-eso-trait-map",
  slug: "armor-no-trait",
  title: "Armor No Trait",
  key: "armor:no-trait",
  traitFamily: "armor",
  traitId: "temper-armor-trait/no-trait",
  esoTraitNum: 0,
  displayOrder: 0,
} as const satisfies TemperEsoTraitMap
