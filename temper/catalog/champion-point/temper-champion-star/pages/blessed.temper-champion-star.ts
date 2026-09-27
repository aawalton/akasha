import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const blessed = {
  id: "01a0e13c-0019-7227-b91f-d2beb3f9c091",
  type: "page-type/temper-champion-star",
  slug: "blessed",
  title: "Blessed",
  description: "Increases Healing Done by 2% (max 20 points)",
  esoChampionSkillId: 108,
  championConstellation: "warfare",
  isSlottable: false,
  effects: [
    { metric: "temper-metric/healing-done-base", effectType: "fractional-change", value: 0.02 },
  ],
  hashPlace: 73,
} as const satisfies TemperChampionStar
