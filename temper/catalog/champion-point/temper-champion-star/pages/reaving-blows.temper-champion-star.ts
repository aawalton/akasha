import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const reavingBlows = {
  id: "01a0e13c-001b-7cc4-aee6-b02ac48b1dbd",
  type: "page-type/temper-champion-star",
  slug: "reaving-blows",
  title: "Reaving Blows",
  description: "When you deal direct damage you heal for 7% of the damage done",
  esoChampionSkillId: 30,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 106,
  jumpPoints: [0, 50],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:31.001Z",
} as const satisfies TemperChampionStar
