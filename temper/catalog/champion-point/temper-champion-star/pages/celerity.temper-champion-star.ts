import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const celerity = {
  id: "01a0e13c-001a-74ec-9957-9bb2c7734a3b",
  type: "page-type/temper-champion-star",
  slug: "celerity",
  title: "Celerity",
  description: "Increases your Movement Speed by 10%",
  esoChampionSkillId: 270,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 47,
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.922Z",
  updatedAt: "2026-10-19T22:56:36.792Z",
} as const satisfies TemperChampionStar
