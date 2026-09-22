import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"

export const weaponIntricate = {
  id: "01a05fd7-41ce-7a5a-93ae-08d23be58f6a",
  type: "page-type/temper-eso-trait-map",
  slug: "weapon-intricate",
  title: "Weapon Intricate",
  key: "weapon:intricate",
  traitFamily: "weapon",
  traitId: "temper-weapon-trait/intricate",
  esoTraitNum: 9,
  displayOrder: 9,
} as const satisfies TemperEsoTraitMap
