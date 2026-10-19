import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const weaponsExpert = {
  id: "01a0e13c-001c-7465-a243-a478795bdb98",
  type: "page-type/temper-champion-star",
  slug: "weapons-expert",
  title: "Weapons Expert",
  description: "Increases your damage done with Light and Heavy Attacks by 20%",
  esoChampionSkillId: 259,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 102,
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.924Z",
  updatedAt: "2026-10-19T22:57:45.069Z",
} as const satisfies TemperChampionStar
