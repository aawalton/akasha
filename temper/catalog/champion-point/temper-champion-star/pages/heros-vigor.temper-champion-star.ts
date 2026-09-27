import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const herosVigor = {
  id: "01a0e13c-001a-7c08-9ce2-1af74b0f8418",
  type: "page-type/temper-champion-star",
  slug: "heros-vigor",
  title: "Hero's Vigor",
  description: "Grants 560 Max Health (max 20 points)",
  esoChampionSkillId: 113,
  championConstellation: "fitness",
  isSlottable: false,
  effects: [{ metric: "temper-metric/health-maximum", effectType: "integer", value: 560 }],
  hashPlace: 32,
} as const satisfies TemperChampionStar
