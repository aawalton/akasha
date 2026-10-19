import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const reinforced = {
  id: "01a0e13c-001b-7582-909d-a44dda0529d7",
  type: "page-type/temper-champion-star",
  slug: "reinforced",
  title: "Reinforced",
  description:
    "When you begin Bracing, you gain a damage shield that absorbs 5140 damage for 3 seconds. This effect can occur once every 10 seconds",
  esoChampionSkillId: 160,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 113,
  jumpPoints: [0, 50],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:15.504Z",
} as const satisfies TemperChampionStar
