import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const fightingFinesse = {
  id: "01a0e13c-001a-751a-b3b6-0943e7ddf9b5",
  type: "page-type/temper-champion-star",
  slug: "fighting-finesse",
  title: "Fighting Finesse",
  description: "Increases your Critical Damage and Critical Healing done by 8%",
  esoChampionSkillId: 12,
  championConstellation: "warfare",
  isSlottable: true,
  effects: [
    { metric: "temper-metric/critical-damage", effectType: "fractional-change", value: 0.08 },
    {
      metric: "temper-metric/healing-critical-bonus",
      effectType: "fractional-change",
      value: 0.08,
    },
  ],
  hashPlace: 88,
} as const satisfies TemperChampionStar
