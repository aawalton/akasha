import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const gildedFingers = {
  id: "01a0e13c-001a-79c3-98e1-fda0be7e0f7a",
  type: "page-type/temper-champion-star",
  slug: "gilded-fingers",
  title: "Gilded Fingers",
  description: "Increases your gold gained by 10%",
  esoChampionSkillId: 74,
  championConstellation: "craft",
  isSlottable: false,
  effects: [{ metric: "temper-metric/gold-gain", effectType: "fractional-change", value: 0.1 }],
  hashPlace: 15,
} as const satisfies TemperChampionStar
