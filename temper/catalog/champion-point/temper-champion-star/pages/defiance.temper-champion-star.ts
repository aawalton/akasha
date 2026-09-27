import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const defiance = {
  id: "01a0e13c-001a-75f7-92b7-e1ea14fc1a03",
  type: "page-type/temper-champion-star",
  slug: "defiance",
  title: "Defiance",
  description: "Reduces the cost of Break Free by 220 Stamina",
  esoChampionSkillId: 128,
  championConstellation: "fitness",
  isSlottable: false,
  effects: [{ metric: "temper-metric/break-free-cost", effectType: "integer", value: -220 }],
  hashPlace: 42,
} as const satisfies TemperChampionStar
