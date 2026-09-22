import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const weaponPrecise = {
  id: "01a05fd7-41d0-7630-beea-3e2c4c6a1743",
  type: "page-type/temper-eso-trait-map",
  slug: "weapon-precise",
  title: "Weapon Precise",
  key: "weapon:precise",
  traitFamily: "weapon",
  traitId: "temper-weapon-trait/precise",
  esoTraitNum: 3,
  displayOrder: 3,
} as const satisfies TemperEsoTraitMap
