import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitSturdyNormal = {
  id: "01a0d3ea-15d2-7c5b-b883-5b860b22c5e9",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-sturdy-normal",
  title: "Sturdy at Normal",
  thing: "temper-armor-trait/sturdy",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-sturdy",
  value: 0.02,
} as const satisfies TemperGearGrade
