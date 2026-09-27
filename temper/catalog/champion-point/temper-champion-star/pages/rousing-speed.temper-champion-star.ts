import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const rousingSpeed = {
  id: "01a0e13c-001b-75a9-8699-7ec9f5cda528",
  type: "page-type/temper-champion-star",
  slug: "rousing-speed",
  title: "Rousing Speed",
  description:
    "Reduces the cost of Sprint by 250 Stamina while under the effects of Crowd Control Immunity",
  esoChampionSkillId: 62,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 60,
} as const satisfies TemperChampionStar
