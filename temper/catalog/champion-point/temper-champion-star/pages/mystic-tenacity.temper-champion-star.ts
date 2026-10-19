import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const mysticTenacity = {
  id: "01a0e13c-001b-7fc6-8d1e-c9836a254665",
  type: "page-type/temper-champion-star",
  slug: "mystic-tenacity",
  title: "Mystic Tenacity",
  description: "Reduces the duration of Elemental Status Effects applied to you by 25%",
  esoChampionSkillId: 53,
  championConstellation: "fitness",
  isSlottable: false,
  hashPlace: 35,
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:41.757Z",
} as const satisfies TemperChampionStar
