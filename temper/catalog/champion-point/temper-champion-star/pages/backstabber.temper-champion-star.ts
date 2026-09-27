import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const backstabber = {
  id: "01a0e13c-0019-7a0f-8b5f-6720d94b9484",
  type: "page-type/temper-champion-star",
  slug: "backstabber",
  title: "Backstabber",
  description: "Increases your Critical Damage done by 10% against enemies you are flanking",
  esoChampionSkillId: 31,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 109,
} as const satisfies TemperChampionStar
