import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const temperedSoul = {
  id: "01a0e13c-001c-7d07-8bcb-a1e6eb540c84",
  type: "page-type/temper-champion-star",
  slug: "tempered-soul",
  title: "Tempered Soul",
  description: "Return to life after resurrection with 10% more resources",
  esoChampionSkillId: 58,
  championConstellation: "fitness",
  isSlottable: false,
  hashPlace: 33,
} as const satisfies TemperChampionStar
