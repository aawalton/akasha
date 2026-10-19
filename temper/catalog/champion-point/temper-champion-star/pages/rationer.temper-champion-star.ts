import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const rationer = {
  id: "01a0e13c-001b-73a7-9194-fef3130a6057",
  type: "page-type/temper-champion-star",
  slug: "rationer",
  title: "Rationer",
  description:
    "Adds 30 minutes to the duration of any food or drink that increases your character's stats",
  esoChampionSkillId: 85,
  championConstellation: "craft",
  isSlottable: false,
  hashPlace: 5,
  jumpPoints: [0, 10, 20, 30],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:09.510Z",
} as const satisfies TemperChampionStar
