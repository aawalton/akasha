import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const enduringResolve = {
  id: "01a0e13c-001a-705d-82d5-3ee5f4b767fb",
  type: "page-type/temper-champion-star",
  slug: "enduring-resolve",
  title: "Enduring Resolve",
  description: "Reduces your damage taken by damage over time attacks by 6%",
  esoChampionSkillId: 136,
  championConstellation: "warfare",
  isSlottable: true,
  effects: [
    { metric: "temper-metric/damage-taken", effectType: "fractional-change", value: -0.06 },
  ],
  hashPlace: 112,
  jumpPoints: [0, 25, 50],
  createdAt: "2026-09-27T05:00:00.922Z",
  updatedAt: "2026-10-19T22:56:28.568Z",
} as const satisfies TemperChampionStar
