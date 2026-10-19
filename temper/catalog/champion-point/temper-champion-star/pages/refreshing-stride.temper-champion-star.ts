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
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:19.799Z",
} as const satisfies TemperChampionStar
