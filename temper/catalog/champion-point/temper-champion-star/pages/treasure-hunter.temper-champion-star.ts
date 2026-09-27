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
} as const satisfies TemperChampionStar
