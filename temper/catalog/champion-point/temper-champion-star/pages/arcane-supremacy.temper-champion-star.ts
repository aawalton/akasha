import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const arcaneSupremacy = {
  id: "01a0e13c-0019-7a00-b263-022735248ad4",
  type: "page-type/temper-champion-star",
  slug: "arcane-supremacy",
  title: "Arcane Supremacy",
  description: "Increases Max Magicka by 1300",
  esoChampionSkillId: 3,
  championConstellation: "warfare",
  isSlottable: false,
  hashPlace: 86,
} as const satisfies TemperChampionStar
