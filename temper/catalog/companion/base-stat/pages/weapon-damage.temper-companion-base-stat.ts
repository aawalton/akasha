import type { TemperCompanionBaseStat } from "akasha/temper/catalog/companion/base-stat/temper-companion-base-stat.page-type.types.ts"

export const weaponDamage = {
  id: "01a0ded4-56ea-78f2-95f1-d7c5795867b0",
  type: "page-type/temper-companion-base-stat",
  slug: "weapon-damage",
  key: "weapon-damage",
  title: "Base Weapon Damage",
  metricId: "temper-companion-passive-metric/companion-weapon-damage",
  effectType: "integer",
  value: 2000,
  createdAt: "2026-09-26T17:47:32.970Z",
  updatedAt: "2026-09-26T17:47:36.000Z",
} as const satisfies TemperCompanionBaseStat
