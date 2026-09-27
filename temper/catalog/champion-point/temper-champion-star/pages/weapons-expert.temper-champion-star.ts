import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const weaponsExpert = {
  id: "01a0e13c-001c-7465-a243-a478795bdb98",
  type: "page-type/temper-champion-star",
  slug: "weapons-expert",
  title: "Weapons Expert",
  description: "Increases your damage done with Light and Heavy Attacks by 20%",
  esoChampionSkillId: 259,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 102,
} as const satisfies TemperChampionStar
