import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const strategicReserve = {
  id: "01a0e13c-001b-7b23-b0cb-f78e70e48106",
  type: "page-type/temper-champion-star",
  slug: "strategic-reserve",
  title: "Strategic Reserve",
  description: "Gain 30 Health Recovery for every 10 Ultimate you have",
  esoChampionSkillId: 49,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 55,
} as const satisfies TemperChampionStar
