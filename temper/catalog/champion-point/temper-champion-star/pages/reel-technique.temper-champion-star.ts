import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const reelTechnique = {
  id: "01a0e13c-001b-761c-a489-80959b39c274",
  type: "page-type/temper-champion-star",
  slug: "reel-technique",
  title: "Reel Technique",
  description: "Decreases the time it takes for a fish to bite by 25%",
  esoChampionSkillId: 88,
  championConstellation: "craft",
  isSlottable: true,
  hashPlace: 26,
} as const satisfies TemperChampionStar
