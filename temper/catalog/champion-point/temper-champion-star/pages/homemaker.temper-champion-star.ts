import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const homemaker = {
  id: "01a0e13c-001a-79f6-b5d9-eb1f46b05ff4",
  type: "page-type/temper-champion-star",
  slug: "homemaker",
  title: "Homemaker",
  description:
    "You have a 10% chance to find a second furnishing plan whenever you find a furnishing plan in the world",
  esoChampionSkillId: 91,
  championConstellation: "craft",
  isSlottable: false,
  hashPlace: 7,
  jumpPoints: [0, 25],
  createdAt: "2026-09-27T05:00:00.922Z",
  updatedAt: "2026-10-19T22:56:46.484Z",
} as const satisfies TemperChampionStar
