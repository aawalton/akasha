import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const preparation = {
  id: "01a0e13c-001b-7566-80a9-60949551f036",
  type: "page-type/temper-champion-star",
  slug: "preparation",
  title: "Preparation",
  description: "Reduces your damage taken from non-player attacks by 10%",
  esoChampionSkillId: 14,
  championConstellation: "warfare",
  isSlottable: false,
  effects: [{ metric: "temper-metric/damage-taken", effectType: "fractional-change", value: -0.1 }],
  hashPlace: 81,
} as const satisfies TemperChampionStar
