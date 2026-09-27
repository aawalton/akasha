import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const untamedAggression = {
  id: "01a0e13c-001c-7c03-8e86-0c30e26a59d6",
  type: "page-type/temper-champion-star",
  slug: "untamed-aggression",
  title: "Untamed Aggression",
  description: "Increases your Weapon and Spell Damage by 150",
  esoChampionSkillId: 4,
  championConstellation: "warfare",
  isSlottable: false,
  hashPlace: 85,
} as const satisfies TemperChampionStar
