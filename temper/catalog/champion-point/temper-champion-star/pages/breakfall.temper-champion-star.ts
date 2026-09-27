import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const breakfall = {
  id: "01a0e13c-001a-745c-91ec-1d3865282d02",
  type: "page-type/temper-champion-star",
  slug: "breakfall",
  title: "Breakfall",
  description: "Reduces your fall damage taken by 35%",
  esoChampionSkillId: 69,
  championConstellation: "craft",
  isSlottable: false,
  hashPlace: 16,
} as const satisfies TemperChampionStar
