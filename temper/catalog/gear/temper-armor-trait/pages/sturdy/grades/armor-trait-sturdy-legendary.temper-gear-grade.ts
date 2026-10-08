import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitSturdyLegendary = {
  id: "01a0d3ea-264f-747e-a40f-e90441fe9d9f",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-sturdy-legendary",
  title: "Sturdy at Legendary",
  thing: "temper-armor-trait/sturdy",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-sturdy",
  value: 0.04,
  createdAt: "2026-09-24T14:55:32.943Z",
  updatedAt: "2026-09-24T14:56:18.000Z",
} as const satisfies TemperGearGrade
