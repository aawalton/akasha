import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const thaumaturge = {
  id: "01a0e13c-001c-7c32-af3a-065f1f22a01f",
  type: "page-type/temper-champion-star",
  slug: "thaumaturge",
  title: "Thaumaturge",
  description: "Increases your damage done with damage over time effects by 6%",
  esoChampionSkillId: 27,
  championConstellation: "warfare",
  isSlottable: true,
  effects: [
    { metric: "temper-metric/damage-done-dot", effectType: "fractional-change", value: 0.06 },
  ],
  hashPlace: 105,
} as const satisfies TemperChampionStar
