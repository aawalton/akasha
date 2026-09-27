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
} as const satisfies TemperChampionStar
