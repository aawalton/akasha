import type { TemperEsoTraitMap } from "../temper-eso-trait-map.page-type.ts"

export const weaponDefending = {
  id: "01a05fd7-41ce-714a-b34c-9c58d923bcef",
  pageTypeSlug: "temper-eso-trait-map",
  slug: "weapon-defending",
  title: "Weapon Defending",
  key: "weapon:defending",
  traitFamily: "weapon",
  traitId: "defending",
  esoTraitNum: 5,
  displayOrder: 5,
} as const satisfies TemperEsoTraitMap
