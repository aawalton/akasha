import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const hasty = {
  id: "01a0e13c-001a-71f8-8a7c-7d3e3a9e2821",
  type: "page-type/temper-champion-star",
  slug: "hasty",
  title: "Hasty",
  description: "Increases your movement speed when Sprinting by 4%",
  esoChampionSkillId: 42,
  championConstellation: "fitness",
  isSlottable: false,
  effects: [
    { metric: "temper-metric/movement-sprint-speed", effectType: "fractional-change", value: 0.04 },
  ],
  hashPlace: 31,
} as const satisfies TemperChampionStar
