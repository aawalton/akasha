import type { TemperCompanionBaseStat } from "akasha/temper/catalog/companion/base-stat/temper-companion-base-stat.page-type.types.ts"

export const criticalDamage = {
  id: "01a0ded4-56ea-77fb-abba-33ee4ee6ddd0",
  type: "page-type/temper-companion-base-stat",
  slug: "critical-damage",
  key: "critical-damage",
  title: "Base Critical Damage",
  metricId: "temper-companion-passive-metric/companion-critical-damage",
  effectType: "fractional-change",
  value: 0.5,
} as const satisfies TemperCompanionBaseStat
