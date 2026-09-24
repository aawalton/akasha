import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitDivinesSuperior = {
  id: "01a0d3e8-8908-7906-853a-721dd638e007",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-divines-superior",
  title: "Divines at Superior",
  thing: "temper-armor-trait/divines",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-divines",
  value: 0.071,
} as const satisfies TemperGearGrade
