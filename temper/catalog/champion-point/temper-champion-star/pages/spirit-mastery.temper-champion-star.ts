import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const spiritMastery = {
  id: "01a0e13c-001b-7fa6-8f78-4297857b3ef9",
  type: "page-type/temper-champion-star",
  slug: "spirit-mastery",
  title: "Spirit Mastery",
  description: "Decreases the time it takes to resurrect an ally by 33%",
  esoChampionSkillId: 56,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 52,
} as const satisfies TemperChampionStar
