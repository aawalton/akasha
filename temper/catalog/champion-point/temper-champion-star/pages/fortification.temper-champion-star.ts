import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const fortification = {
  id: "01a0e13c-001a-78f6-aa3d-2bf3f1cea11c",
  type: "page-type/temper-champion-star",
  slug: "fortification",
  title: "Fortification",
  description: "Increases the amount of damage you can block by 4%",
  esoChampionSkillId: 43,
  championConstellation: "fitness",
  isSlottable: false,
  effects: [
    { metric: "temper-metric/block-mitigation", effectType: "fractional-change", value: 0.04 },
  ],
  hashPlace: 40,
} as const satisfies TemperChampionStar
