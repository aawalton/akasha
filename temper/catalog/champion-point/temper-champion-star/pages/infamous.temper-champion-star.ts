import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const infamous = {
  id: "01a0e13c-001a-7db9-ae91-f813af4ffad6",
  type: "page-type/temper-champion-star",
  slug: "infamous",
  title: "Infamous",
  description: "Increases the value of fenced items by 25%",
  esoChampionSkillId: 77,
  championConstellation: "craft",
  isSlottable: false,
  hashPlace: 13,
} as const satisfies TemperChampionStar
