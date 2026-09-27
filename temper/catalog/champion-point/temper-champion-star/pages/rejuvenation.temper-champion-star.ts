import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const rejuvenation = {
  id: "01a0e13c-001b-75d0-aa8c-1da8aa82a3e4",
  type: "page-type/temper-champion-star",
  slug: "rejuvenation",
  title: "Rejuvenation",
  description: "Grants 90 Health, Magicka, and Stamina Recovery",
  esoChampionSkillId: 35,
  championConstellation: "fitness",
  isSlottable: false,
  effects: [
    { metric: "temper-metric/health-recovery", effectType: "integer", value: 90 },
    { metric: "temper-metric/magicka-recovery", effectType: "integer", value: 90 },
    { metric: "temper-metric/stamina-recovery", effectType: "integer", value: 90 },
  ],
  hashPlace: 43,
} as const satisfies TemperChampionStar
