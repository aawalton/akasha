import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const jewelryHealthy = {
  id: "01a05fd7-41ca-7af4-a3f7-d87c7ad55e43",
  type: "page-type/temper-eso-trait-map",
  slug: "jewelry-healthy",
  title: "Jewelry Healthy",
  key: "jewelry:healthy",
  traitFamily: "jewelry",
  traitId: "temper-jewelry-trait/healthy",
  esoTraitNum: 21,
  displayOrder: 1,
} as const satisfies TemperEsoTraitMap
