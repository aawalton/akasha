import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const soothingShield = {
  id: "01a0e13c-001b-7559-83b7-b84523a47c3f",
  type: "page-type/temper-champion-star",
  slug: "soothing-shield",
  title: "Soothing Shield",
  description: "When you successfully block an attack you have a 15% chance to restore 735 Health",
  esoChampionSkillId: 268,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 61,
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:12.970Z",
} as const satisfies TemperChampionStar
