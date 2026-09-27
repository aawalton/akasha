import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const refreshingStride = {
  id: "01a0e13c-001b-7747-9295-70d62ef95328",
  type: "page-type/temper-champion-star",
  slug: "refreshing-stride",
  title: "Refreshing Stride",
  description: "While Sprinting you gain 500 Health and Magicka Recovery",
  esoChampionSkillId: 271,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 48,
} as const satisfies TemperChampionStar
