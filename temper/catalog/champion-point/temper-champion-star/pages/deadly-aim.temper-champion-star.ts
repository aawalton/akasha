import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const deadlyAim = {
  id: "01a0e13c-001a-7994-93eb-1d5cfbe114f6",
  type: "page-type/temper-champion-star",
  slug: "deadly-aim",
  title: "Deadly Aim",
  description: "Increase your damage done with single target attacks by 6%",
  esoChampionSkillId: 25,
  championConstellation: "warfare",
  isSlottable: true,
  effects: [
    {
      metric: "temper-metric/damage-done-single-target",
      effectType: "fractional-change",
      value: 0.06,
    },
  ],
  hashPlace: 103,
} as const satisfies TemperChampionStar
