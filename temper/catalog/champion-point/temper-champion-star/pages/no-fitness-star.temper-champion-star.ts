import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const noFitnessStar = {
  id: "01a0e13c-001b-7708-9e34-0df35adaaf41",
  type: "page-type/temper-champion-star",
  slug: "no-fitness-star",
  title: "No Fitness Star",
  description: "No fitness star slotted",
  esoChampionSkillId: 0,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 45,
} as const satisfies TemperChampionStar
