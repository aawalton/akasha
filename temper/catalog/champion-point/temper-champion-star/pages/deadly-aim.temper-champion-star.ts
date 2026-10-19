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
  jumpPoints: [0, 25, 50],
  createdAt: "2026-09-27T05:00:00.922Z",
  updatedAt: "2026-10-19T22:56:42.973Z",
} as const satisfies TemperChampionStar
