import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const sustainingShadows = {
  id: "01a0e13c-001b-74fe-b14f-8dbdc4a5d5a9",
  type: "page-type/temper-champion-star",
  slug: "sustaining-shadows",
  title: "Sustaining Shadows",
  description: "Reduces the cost of Sneak by 50%",
  esoChampionSkillId: 65,
  championConstellation: "craft",
  isSlottable: true,
  effects: [{ metric: "temper-metric/sneak-cost", effectType: "fractional-change", value: -0.5 }],
  hashPlace: 29,
} as const satisfies TemperChampionStar
