import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const liquidEfficiency = {
  id: "01a0e13c-001b-7e26-91cd-ac9eff0b558b",
  type: "page-type/temper-champion-star",
  slug: "liquid-efficiency",
  title: "Liquid Efficiency",
  description: "Whenever you use a potion or poison you have a 10% chance to not consume it",
  esoChampionSkillId: 86,
  championConstellation: "craft",
  isSlottable: false,
  hashPlace: 6,
  jumpPoints: [0, 50],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:35.589Z",
} as const satisfies TemperChampionStar
