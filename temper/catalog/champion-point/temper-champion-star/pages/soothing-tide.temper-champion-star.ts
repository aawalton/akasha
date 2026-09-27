import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const soothingTide = {
  id: "01a0e13c-001b-7117-b26c-c7a5da4ec414",
  type: "page-type/temper-champion-star",
  slug: "soothing-tide",
  title: "Soothing Tide",
  description: "Increases your Healing Done by area of effect heals by 10%",
  esoChampionSkillId: 24,
  championConstellation: "warfare",
  isSlottable: true,
  effects: [
    { metric: "temper-metric/healing-done-aoe", effectType: "fractional-change", value: 0.1 },
  ],
  hashPlace: 93,
} as const satisfies TemperChampionStar
