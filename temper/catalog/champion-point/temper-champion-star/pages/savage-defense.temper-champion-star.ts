import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const savageDefense = {
  id: "01a0e13c-001b-79bd-a068-b8deee7f83bf",
  type: "page-type/temper-champion-star",
  slug: "savage-defense",
  title: "Savage Defense",
  description: "Reduces the cost of Bash by 90 Stamina",
  esoChampionSkillId: 40,
  championConstellation: "fitness",
  isSlottable: false,
  effects: [{ metric: "temper-metric/bash-cost", effectType: "integer", value: -90 }],
  hashPlace: 37,
} as const satisfies TemperChampionStar
