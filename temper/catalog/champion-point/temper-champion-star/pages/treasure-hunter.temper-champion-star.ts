import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const treasureHunter = {
  id: "01a0e13c-001c-7439-9a62-c514fca2d4f3",
  type: "page-type/temper-champion-star",
  slug: "treasure-hunter",
  title: "Treasure Hunter",
  description: "Increase the quality of items you find in treasure chests",
  esoChampionSkillId: 79,
  championConstellation: "craft",
  isSlottable: false,
  hashPlace: 3,
  jumpPoints: [0, 50],
  createdAt: "2026-09-27T05:00:00.924Z",
  updatedAt: "2026-10-19T22:57:44.152Z",
} as const satisfies TemperChampionStar
