import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const professionalUpkeep = {
  id: "01a0e13c-001b-7aba-90c1-f00c832be9af",
  type: "page-type/temper-champion-star",
  slug: "professional-upkeep",
  title: "Professional Upkeep",
  description: "Reduces the cost of repairing your armor by 50%",
  esoChampionSkillId: 1,
  championConstellation: "craft",
  isSlottable: false,
  hashPlace: 19,
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-09-27T05:00:07.000Z",
} as const satisfies TemperChampionStar
