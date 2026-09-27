import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const hardened = {
  id: "01a0e13c-001a-7a94-9342-016e55398e94",
  type: "page-type/temper-champion-star",
  slug: "hardened",
  title: "Hardened",
  description: "Increases the duration of Crowd Control Immunity by 15%",
  esoChampionSkillId: 55,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 70,
} as const satisfies TemperChampionStar
