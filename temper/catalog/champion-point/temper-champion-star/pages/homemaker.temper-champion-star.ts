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
} as const satisfies TemperChampionStar
