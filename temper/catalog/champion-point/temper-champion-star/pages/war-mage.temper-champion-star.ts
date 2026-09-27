import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const warMage = {
  id: "01a0e13c-001c-7d95-9005-7f521c086737",
  type: "page-type/temper-champion-star",
  slug: "war-mage",
  title: "War Mage",
  description:
    "Grants 100 Weapon and Spell Damage to Magical attacks. Affects Magic, Flame, Frost, and Shock Damage",
  esoChampionSkillId: 21,
  championConstellation: "warfare",
  isSlottable: false,
  hashPlace: 76,
} as const satisfies TemperChampionStar
