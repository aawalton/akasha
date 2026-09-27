import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const relentlessness = {
  id: "01a0e13c-001b-718f-808a-2cb9227f174d",
  type: "page-type/temper-champion-star",
  slug: "relentlessness",
  title: "Relentlessness",
  description:
    "Being Stunned or Feared causes you to gain Major Protection for 3 seconds, reducing your damage taken by 10%",
  esoChampionSkillId: 274,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 56,
} as const satisfies TemperChampionStar
