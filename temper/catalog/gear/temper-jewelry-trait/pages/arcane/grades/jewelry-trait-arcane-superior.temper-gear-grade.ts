import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitArcaneSuperior = {
  id: "01a0d3e9-50b5-779b-b991-2c75fcf2835e",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-arcane-superior",
  title: "Arcane at Superior",
  thing: "temper-jewelry-trait/arcane",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 827,
} as const satisfies TemperGearGrade
