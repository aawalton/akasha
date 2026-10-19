import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const survivalInstincts = {
  id: "01a0e13c-001b-73c8-bed9-660a1ea0423a",
  type: "page-type/temper-champion-star",
  slug: "survival-instincts",
  title: "Survival Instincts",
  description: "While afflicted with a Status Effect, your core combat skills cost 25% less",
  esoChampionSkillId: 57,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 51,
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:10.351Z",
} as const satisfies TemperChampionStar
