import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const resilience = {
  id: "01a0e13c-001b-7564-8e7a-a5ff33503dee",
  type: "page-type/temper-champion-star",
  slug: "resilience",
  title: "Resilience",
  description: "Grants 660 Critical Resistance",
  esoChampionSkillId: 13,
  championConstellation: "warfare",
  isSlottable: true,
  effects: [{ metric: "temper-metric/resistance-critical", effectType: "integer", value: 660 }],
  hashPlace: 111,
} as const satisfies TemperChampionStar
