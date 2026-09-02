import type { TemperEsoTraitMap } from "../temper-eso-trait-map.page-type.ts"

export const armorTraining = {
  id: "01a05fd7-41c9-7e60-b329-6bcdd4da6c9e",
  pageTypeSlug: "temper-eso-trait-map",
  slug: "armor-training",
  title: "Armor Training",
  key: "armor:training",
  traitFamily: "armor",
  traitId: "training",
  esoTraitNum: 15,
  displayOrder: 5,
} as const satisfies TemperEsoTraitMap
