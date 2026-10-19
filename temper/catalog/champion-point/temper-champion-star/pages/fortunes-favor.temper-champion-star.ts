import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const fortunesFavor = {
  id: "01a0e13c-001a-79ab-abe4-b4b5408ab99c",
  type: "page-type/temper-champion-star",
  slug: "fortunes-favor",
  title: "Fortune's Favor",
  description: "Increases the amount of gold you find in treasure chests and safeboxes by 50%",
  esoChampionSkillId: 71,
  championConstellation: "craft",
  isSlottable: false,
  hashPlace: 12,
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.922Z",
  updatedAt: "2026-10-19T22:56:44.738Z",
} as const satisfies TemperChampionStar
