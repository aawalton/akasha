import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const jewelryHarmony = {
  id: "01a05fd7-41ca-730e-bfdc-f8cd39002472",
  type: "page-type/temper-eso-trait-map",
  slug: "jewelry-harmony",
  title: "Jewelry Harmony",
  key: "jewelry:harmony",
  traitFamily: "jewelry",
  traitId: "temper-jewelry-trait/harmony",
  esoTraitNum: 29,
  displayOrder: 7,
} as const satisfies TemperEsoTraitMap
