import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const ironclad = {
  id: "01a0e13c-001b-70d0-a353-51bbe8d0c9c3",
  type: "page-type/temper-champion-star",
  slug: "ironclad",
  title: "Ironclad",
  description: "Reduces your damage taken by direct damage attacks by 6%",
  esoChampionSkillId: 265,
  championConstellation: "warfare",
  isSlottable: true,
  effects: [
    { metric: "temper-metric/damage-taken", effectType: "fractional-change", value: -0.06 },
  ],
  hashPlace: 110,
} as const satisfies TemperChampionStar
