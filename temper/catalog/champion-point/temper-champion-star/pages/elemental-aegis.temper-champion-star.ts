import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const elementalAegis = {
  id: "01a0e13c-001a-767e-87af-a54dd1553f2f",
  type: "page-type/temper-champion-star",
  slug: "elemental-aegis",
  title: "Elemental Aegis",
  description:
    "Reduces the damage you take from Magical attacks by 2%. Affects Magic, Flame, Frost, and Shock Damage",
  esoChampionSkillId: 15,
  championConstellation: "warfare",
  isSlottable: false,
  effects: [
    { metric: "temper-metric/damage-taken", effectType: "fractional-change", value: -0.02 },
  ],
  hashPlace: 82,
} as const satisfies TemperChampionStar
