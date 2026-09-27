import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const duelistsRebuff = {
  id: "01a0e13c-001a-7cae-b888-631ce4b67233",
  type: "page-type/temper-champion-star",
  slug: "duelists-rebuff",
  title: "Duelist's Rebuff",
  description: "Reduces your damage taken by single target attacks by 6%",
  esoChampionSkillId: 134,
  championConstellation: "warfare",
  isSlottable: true,
  effects: [
    { metric: "temper-metric/damage-taken", effectType: "fractional-change", value: -0.06 },
  ],
  hashPlace: 118,
} as const satisfies TemperChampionStar
