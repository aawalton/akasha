import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const unassailable = {
  id: "01a0e13c-001c-7aba-a39c-f625ed976481",
  type: "page-type/temper-champion-star",
  slug: "unassailable",
  title: "Unassailable",
  description: "Reduces your damage taken by area of effect attacks by 6%",
  esoChampionSkillId: 133,
  championConstellation: "warfare",
  isSlottable: true,
  effects: [
    {
      metric: "temper-metric/damage-taken-from-area",
      effectType: "fractional-change",
      value: -0.06,
    },
  ],
  hashPlace: 119,
} as const satisfies TemperChampionStar
