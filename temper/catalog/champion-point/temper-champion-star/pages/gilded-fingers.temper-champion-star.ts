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
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.922Z",
  updatedAt: "2026-10-19T22:56:45.542Z",
} as const satisfies TemperChampionStar
