import type { TemperEsoTraitMap } from "../temper-eso-trait-map.page-type.ts"

export const weaponTraining = {
  id: "01a05fd7-41d0-70f2-ab14-077aceb05f15",
  pageTypeSlug: "temper-eso-trait-map",
  slug: "weapon-training",
  title: "Weapon Training",
  key: "weapon:training",
  traitFamily: "weapon",
  traitId: "training",
  esoTraitNum: 6,
  displayOrder: 6,
} as const satisfies TemperEsoTraitMap
