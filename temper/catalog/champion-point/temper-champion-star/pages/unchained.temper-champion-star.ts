import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const unchained = {
  id: "01a0e13c-001c-703e-8340-1aa1ecb89b49",
  type: "page-type/temper-champion-star",
  slug: "unchained",
  title: "Unchained",
  description:
    "When you use Break Free, the cost of your next Stamina ability used within 5 seconds is reduced by 55%",
  esoChampionSkillId: 64,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 67,
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.924Z",
  updatedAt: "2026-10-19T22:57:42.568Z",
} as const satisfies TemperChampionStar
