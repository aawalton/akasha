import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const weaponNoTrait = {
  id: "01a05fd7-41cf-747b-81dc-2a443b8c374f",
  type: "page-type/temper-eso-trait-map",
  slug: "weapon-no-trait",
  title: "Weapon No Trait",
  key: "weapon:no-trait",
  traitFamily: "weapon",
  traitId: "temper-weapon-trait/no-trait",
  esoTraitNum: 0,
  displayOrder: 0,
} as const satisfies TemperEsoTraitMap
