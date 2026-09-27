import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const masterAtArms = {
  id: "01a0e13c-001b-7b8c-a456-1ead081c3c2e",
  type: "page-type/temper-champion-star",
  slug: "master-at-arms",
  title: "Master-at-Arms",
  description: "Increases your damage done with direct damage attacks by 6%",
  esoChampionSkillId: 264,
  championConstellation: "warfare",
  isSlottable: true,
  effects: [
    { metric: "temper-metric/damage-done-direct", effectType: "fractional-change", value: 0.06 },
  ],
  hashPlace: 101,
} as const satisfies TemperChampionStar
