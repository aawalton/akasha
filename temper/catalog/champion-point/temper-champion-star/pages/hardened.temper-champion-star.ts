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
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.922Z",
  updatedAt: "2026-10-19T22:56:47.427Z",
} as const satisfies TemperChampionStar
