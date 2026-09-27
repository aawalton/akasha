import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const rejuvenator = {
  id: "01a0e13c-001b-781d-8980-b9bdecf267cc",
  type: "page-type/temper-champion-star",
  slug: "rejuvenator",
  title: "Rejuvenator",
  description: "Grants 205 Weapon and Spell Damage to your healing abilities",
  esoChampionSkillId: 9,
  championConstellation: "warfare",
  isSlottable: true,
  effects: [{ metric: "temper-metric/power", effectType: "integer", value: 205 }],
  hashPlace: 94,
} as const satisfies TemperChampionStar
