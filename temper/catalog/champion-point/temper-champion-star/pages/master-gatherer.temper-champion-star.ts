import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const masterGatherer = {
  id: "01a0e13c-001b-71d9-883d-ff1c77d41244",
  type: "page-type/temper-champion-star",
  slug: "master-gatherer",
  title: "Master Gatherer",
  description: "Reduces the time it takes to harvest by 50%",
  esoChampionSkillId: 78,
  championConstellation: "craft",
  isSlottable: true,
  hashPlace: 24,
  jumpPoints: [0, 15, 30, 45, 60, 75],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:06.231Z",
} as const satisfies TemperChampionStar
