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
  createdAt: "2026-09-26T17:47:32.970Z",
  updatedAt: "2026-09-26T17:47:36.000Z",
} as const satisfies TemperCompanionBaseStat
