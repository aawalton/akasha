import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitDivinesNormal = {
  id: "01a0d3e8-80aa-780b-9022-a79914e4217d",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-divines-normal",
  title: "Divines at Normal",
  thing: "temper-armor-trait/divines",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-divines",
  value: 0.051,
} as const satisfies TemperGearGrade
