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
} as const satisfies TemperChampionStar
