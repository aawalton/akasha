import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const precision = {
  id: "01a0e13c-001b-7a4d-8497-c5931a09d673",
  type: "page-type/temper-champion-star",
  slug: "precision",
  title: "Precision",
  description: "Grants 320 Critical Chance (max 20 points)",
  esoChampionSkillId: 11,
  championConstellation: "warfare",
  isSlottable: false,
  effects: [{ metric: "temper-metric/critical-rating", effectType: "integer", value: 320 }],
  hashPlace: 72,
} as const satisfies TemperChampionStar
