import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const wanderer = {
  id: "01a0e13c-001c-7b68-9253-b2ad5f44fb76",
  type: "page-type/temper-champion-star",
  slug: "wanderer",
  title: "Wanderer",
  description: "Reduces the cost of Wayshrine usage by 50%",
  esoChampionSkillId: 70,
  championConstellation: "craft",
  isSlottable: false,
  hashPlace: 8,
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.924Z",
  updatedAt: "2026-10-19T22:57:49.460Z",
} as const satisfies TemperChampionStar
