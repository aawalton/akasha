import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const painsRefuge = {
  id: "01a0e13c-001b-7504-9d6e-4fdf8dcafd9e",
  type: "page-type/temper-champion-star",
  slug: "pains-refuge",
  title: "Pain's Refuge",
  description:
    "Reduces your damage taken by 2% for every 2 negative effects active on you, up to a maximum of 20%",
  esoChampionSkillId: 275,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 57,
  jumpPoints: [0, 50],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:12.117Z",
} as const satisfies TemperChampionStar
