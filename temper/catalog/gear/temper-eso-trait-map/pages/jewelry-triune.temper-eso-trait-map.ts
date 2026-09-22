import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const jewelryTriune = {
  id: "01a05fd7-41cd-786a-93bb-eb60822ccf16",
  type: "page-type/temper-eso-trait-map",
  slug: "jewelry-triune",
  title: "Jewelry Triune",
  key: "jewelry:triune",
  traitFamily: "jewelry",
  traitId: "temper-jewelry-trait/triune",
  esoTraitNum: 30,
  displayOrder: 8,
} as const satisfies TemperEsoTraitMap
