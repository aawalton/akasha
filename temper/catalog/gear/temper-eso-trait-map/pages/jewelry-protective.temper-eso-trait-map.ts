import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const jewelryProtective = {
  id: "01a05fd7-41cc-7d47-b05c-28de2c2bd203",
  type: "page-type/temper-eso-trait-map",
  slug: "jewelry-protective",
  title: "Jewelry Protective",
  key: "jewelry:protective",
  traitFamily: "jewelry",
  traitId: "temper-jewelry-trait/protective",
  esoTraitNum: 32,
  displayOrder: 10,
} as const satisfies TemperEsoTraitMap
