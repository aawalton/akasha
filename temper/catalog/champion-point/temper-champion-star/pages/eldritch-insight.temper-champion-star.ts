import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const eldritchInsight = {
  id: "01a0e13c-001a-7553-aaf2-797f4d931a85",
  type: "page-type/temper-champion-star",
  slug: "eldritch-insight",
  title: "Eldritch Insight",
  description: "Grants 520 Max Magicka (max 20 points)",
  esoChampionSkillId: 99,
  championConstellation: "warfare",
  isSlottable: false,
  effects: [{ metric: "temper-metric/magicka-maximum", effectType: "integer", value: 520 }],
  hashPlace: 84,
} as const satisfies TemperChampionStar
