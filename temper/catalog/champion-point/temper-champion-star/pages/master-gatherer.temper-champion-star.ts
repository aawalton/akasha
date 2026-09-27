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
} as const satisfies TemperChampionStar
