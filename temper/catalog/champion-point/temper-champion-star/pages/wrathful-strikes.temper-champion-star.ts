import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const wrathfulStrikes = {
  id: "01a0e13c-001c-7df5-a414-ff7624363680",
  type: "page-type/temper-champion-star",
  slug: "wrathful-strikes",
  title: "Wrathful Strikes",
  description: "Grants 205 Weapon and Spell Damage to your damaging abilities",
  esoChampionSkillId: 8,
  championConstellation: "warfare",
  isSlottable: true,
  hashPlace: 107,
} as const satisfies TemperChampionStar
