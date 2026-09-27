import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const noWarfareStar = {
  id: "01a0e13c-001b-7d53-8b2a-cbdb4b30cb9e",
  type: "page-type/temper-champion-star",
  slug: "no-warfare-star",
  title: "No Warfare Star",
  description: "No warfare star slotted",
  esoChampionSkillId: 0,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 87,
} as const satisfies TemperChampionStar
