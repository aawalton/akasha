import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const sustainedBySuffering = {
  id: "01a0e13c-001b-78d9-a19e-8e2788fd1e3b",
  type: "page-type/temper-champion-star",
  slug: "sustained-by-suffering",
  title: "Sustained by Suffering",
  description:
    "Increases your Health, Magicka, and Stamina Recovery by 150 while under the effects of a negative effect",
  esoChampionSkillId: 273,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 58,
  jumpPoints: [0, 10, 20, 30, 40, 50],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:23.123Z",
} as const satisfies TemperChampionStar
