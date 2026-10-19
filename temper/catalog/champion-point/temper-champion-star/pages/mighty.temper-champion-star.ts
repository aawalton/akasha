import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const mighty = {
  id: "01a0e13c-001b-72c1-bb51-61a8a3ce639e",
  type: "page-type/temper-champion-star",
  slug: "mighty",
  title: "Mighty",
  description:
    "Grants 100 Weapon and Spell Damage to Martial attacks. Affects Physical, Poison, Disease, and Bleed Damage",
  esoChampionSkillId: 22,
  championConstellation: "warfare",
  isSlottable: false,
  hashPlace: 78,
  jumpPoints: [0, 30],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:07.024Z",
} as const satisfies TemperChampionStar
