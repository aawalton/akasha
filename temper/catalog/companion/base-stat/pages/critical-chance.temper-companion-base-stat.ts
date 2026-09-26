import type { TemperCompanionBaseStat } from "akasha/temper/catalog/companion/base-stat/temper-companion-base-stat.page-type.types.ts"

export const criticalChance = {
  id: "01a0ded4-56ea-7977-bb22-bf7705155203",
  type: "page-type/temper-companion-base-stat",
  slug: "critical-chance",
  key: "critical-chance",
  title: "Base Critical Chance",
  metricId: "temper-companion-passive-metric/companion-critical-chance",
  effectType: "fractional-change",
  value: 0.1,
} as const satisfies TemperCompanionBaseStat
