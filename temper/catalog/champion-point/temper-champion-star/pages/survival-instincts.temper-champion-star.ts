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
} as const satisfies TemperChampionStar
