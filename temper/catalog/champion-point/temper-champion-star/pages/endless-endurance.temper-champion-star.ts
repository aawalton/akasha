import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const endlessEndurance = {
  id: "01a0e13c-001a-7941-a98e-f2930b8cf010",
  type: "page-type/temper-champion-star",
  slug: "endless-endurance",
  title: "Endless Endurance",
  description: "Increases your Max Stamina by 1300",
  esoChampionSkillId: 5,
  championConstellation: "warfare",
  isSlottable: true,
  effects: [{ metric: "temper-metric/stamina-maximum", effectType: "integer", value: 1300 }],
  hashPlace: 120,
} as const satisfies TemperChampionStar
