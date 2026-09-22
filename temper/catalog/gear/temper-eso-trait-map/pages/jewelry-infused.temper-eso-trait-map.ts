import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const jewelryInfused = {
  id: "01a05fd7-41cb-762d-b8c8-04e8ad43e698",
  type: "page-type/temper-eso-trait-map",
  slug: "jewelry-infused",
  title: "Jewelry Infused",
  key: "jewelry:infused",
  traitFamily: "jewelry",
  traitId: "temper-jewelry-trait/infused",
  esoTraitNum: 33,
  displayOrder: 11,
} as const satisfies TemperEsoTraitMap
