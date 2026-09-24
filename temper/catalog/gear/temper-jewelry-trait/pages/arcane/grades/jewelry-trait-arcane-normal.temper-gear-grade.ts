import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitArcaneNormal = {
  id: "01a0d3e9-47ef-7956-b4f2-6a7b2968e137",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-arcane-normal",
  title: "Arcane at Normal",
  thing: "temper-jewelry-trait/arcane",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 767,
} as const satisfies TemperGearGrade
