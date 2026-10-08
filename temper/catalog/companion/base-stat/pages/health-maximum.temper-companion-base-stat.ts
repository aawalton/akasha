import type { TemperCompanionBaseStat } from "akasha/temper/catalog/companion/base-stat/temper-companion-base-stat.page-type.types.ts"

export const healthMaximum = {
  id: "01a0ded4-56ea-7311-b958-21d36791b136",
  type: "page-type/temper-companion-base-stat",
  slug: "health-maximum",
  key: "health-maximum",
  title: "Base Maximum Health",
  metricId: "temper-companion-passive-metric/companion-health-maximum",
  effectType: "integer",
  value: 30000,
  createdAt: "2026-09-26T17:47:32.970Z",
  updatedAt: "2026-09-26T17:47:36.000Z",
} as const satisfies TemperCompanionBaseStat
