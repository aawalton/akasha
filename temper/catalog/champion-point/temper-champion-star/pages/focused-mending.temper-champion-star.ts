import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const focusedMending = {
  id: "01a0e13c-001a-7c03-8c5d-3a90ea68a97a",
  type: "page-type/temper-champion-star",
  slug: "focused-mending",
  title: "Focused Mending",
  description: "Increases your Healing Done with single target heals by 10%",
  esoChampionSkillId: 26,
  championConstellation: "warfare",
  isSlottable: true,
  effects: [
    {
      metric: "temper-metric/healing-done-single-target",
      effectType: "fractional-change",
      value: 0.1,
    },
  ],
  hashPlace: 97,
  createdAt: "2026-09-27T05:00:00.922Z",
  updatedAt: "2026-09-27T05:00:07.000Z",
} as const satisfies TemperChampionStar
