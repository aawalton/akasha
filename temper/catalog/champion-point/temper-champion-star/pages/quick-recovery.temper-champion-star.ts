import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const quickRecovery = {
  id: "01a0e13c-001b-7799-b26c-a595eb370541",
  type: "page-type/temper-champion-star",
  slug: "quick-recovery",
  title: "Quick Recovery",
  description: "Increases your healing received by 2%",
  esoChampionSkillId: 20,
  championConstellation: "warfare",
  isSlottable: false,
  effects: [
    { metric: "temper-metric/healing-taken-base", effectType: "fractional-change", value: 0.02 },
  ],
  hashPlace: 80,
  jumpPoints: [0, 10, 20],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:20.575Z",
} as const satisfies TemperChampionStar
