import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const siphoningSpells = {
  id: "01a0e13c-001b-7935-9a61-3534e8e9df31",
  type: "page-type/temper-champion-star",
  slug: "siphoning-spells",
  title: "Siphoning Spells",
  description: "Restore 1500 Magicka whenever you kill an enemy",
  esoChampionSkillId: 47,
  championConstellation: "fitness",
  isSlottable: true,
  hashPlace: 59,
} as const satisfies TemperChampionStar
