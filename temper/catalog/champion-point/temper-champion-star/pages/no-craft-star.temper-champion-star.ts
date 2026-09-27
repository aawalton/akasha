import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const noCraftStar = {
  id: "01a0e13c-001b-7ebd-a614-b1b805102cfd",
  type: "page-type/temper-champion-star",
  slug: "no-craft-star",
  title: "No Craft Star",
  description: "No craft star slotted",
  esoChampionSkillId: 0,
  championConstellation: "craft",
  isSlottable: true,
  hashPlace: 20,
} as const satisfies TemperChampionStar
