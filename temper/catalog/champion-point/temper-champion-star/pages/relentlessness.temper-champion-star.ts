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
  jumpPoints: [0, 50],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:05.274Z",
} as const satisfies TemperChampionStar
