import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitArcaneFine = {
  id: "01a0d3e9-4084-74ca-a09f-38a5438a6638",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-arcane-fine",
  title: "Arcane at Fine",
  thing: "temper-jewelry-trait/arcane",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-magicka-maximum",
  value: 797,
} as const satisfies TemperGearGrade
