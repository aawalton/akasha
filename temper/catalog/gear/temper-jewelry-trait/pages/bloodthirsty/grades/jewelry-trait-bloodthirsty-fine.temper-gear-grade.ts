import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitBloodthirstyFine = {
  id: "01a0d3e9-69ca-741e-ab0c-78dbd8b9d650",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-bloodthirsty-fine",
  title: "Bloodthirsty at Fine",
  thing: "temper-jewelry-trait/bloodthirsty",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-bloodthirsty",
  value: 297,
} as const satisfies TemperGearGrade
