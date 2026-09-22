import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const weaponDefending = {
  id: "01a05fd7-41ce-714a-b34c-9c58d923bcef",
  type: "page-type/temper-eso-trait-map",
  slug: "weapon-defending",
  title: "Weapon Defending",
  key: "weapon:defending",
  traitFamily: "weapon",
  traitId: "temper-weapon-trait/defending",
  esoTraitNum: 5,
  displayOrder: 5,
} as const satisfies TemperEsoTraitMap
