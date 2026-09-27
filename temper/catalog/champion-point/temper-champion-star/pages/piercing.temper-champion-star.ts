import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const piercing = {
  id: "01a0e13c-001b-7f8d-a513-141ec65f09cb",
  type: "page-type/temper-champion-star",
  slug: "piercing",
  title: "Piercing",
  description: "Grants 700 Offensive Penetration (max 20 points)",
  esoChampionSkillId: 10,
  championConstellation: "warfare",
  isSlottable: false,
  effects: [{ metric: "temper-metric/penetration", effectType: "integer", value: 700 }],
  hashPlace: 74,
} as const satisfies TemperChampionStar
