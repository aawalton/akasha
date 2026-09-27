import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const sprinter = {
  id: "01a0e13c-001b-78e8-b07a-19ef950244e3",
  type: "page-type/temper-champion-star",
  slug: "sprinter",
  title: "Sprinter",
  description: "Reduces the cost of Sprint by 40 Stamina",
  esoChampionSkillId: 38,
  championConstellation: "fitness",
  isSlottable: false,
  effects: [{ metric: "temper-metric/stamina-sprint-cost", effectType: "integer", value: -40 }],
  hashPlace: 30,
} as const satisfies TemperChampionStar
