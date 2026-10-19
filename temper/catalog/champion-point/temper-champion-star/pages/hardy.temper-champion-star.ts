import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const hardy = {
  id: "01a0e13c-001a-7afe-bf55-3754e6d6fdce",
  type: "page-type/temper-champion-star",
  slug: "hardy",
  title: "Hardy",
  description:
    "Reduces the damage you take from Martial attacks by 2%. Affects Physical, Poison, Disease, and Bleed Damage",
  esoChampionSkillId: 16,
  championConstellation: "warfare",
  isSlottable: false,
  effects: [
    { metric: "temper-metric/damage-taken", effectType: "fractional-change", value: -0.02 },
  ],
  hashPlace: 83,
  jumpPoints: [0, 10, 20],
  createdAt: "2026-09-27T05:00:00.922Z",
  updatedAt: "2026-10-19T22:56:48.325Z",
} as const satisfies TemperChampionStar
