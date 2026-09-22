import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const jewelryArcane = {
  id: "01a05fd7-41c9-7919-a81d-d7dad30192f7",
  type: "page-type/temper-eso-trait-map",
  slug: "jewelry-arcane",
  title: "Jewelry Arcane",
  key: "jewelry:arcane",
  traitFamily: "jewelry",
  traitId: "temper-jewelry-trait/arcane",
  esoTraitNum: 22,
  displayOrder: 2,
} as const satisfies TemperEsoTraitMap
