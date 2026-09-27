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
} as const satisfies TemperChampionStar
