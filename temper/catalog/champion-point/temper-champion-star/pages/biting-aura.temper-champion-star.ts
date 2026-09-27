import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const bitingAura = {
  id: "01a0e13c-0019-7b79-b170-7174b5a5022d",
  type: "page-type/temper-champion-star",
  slug: "biting-aura",
  title: "Biting Aura",
  description: "Increases your damage done with area of effect attacks by 6%",
  esoChampionSkillId: 23,
  championConstellation: "warfare",
  isSlottable: true,
  effects: [
    { metric: "temper-metric/damage-done-aoe", effectType: "fractional-change", value: 0.06 },
  ],
  hashPlace: 104,
} as const satisfies TemperChampionStar
