import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitBloodthirstySuperior = {
  id: "01a0d3e9-85f7-744d-94bd-e3a37fa13edf",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-bloodthirsty-superior",
  title: "Bloodthirsty at Superior",
  thing: "temper-jewelry-trait/bloodthirsty",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-bloodthirsty",
  value: 315,
} as const satisfies TemperGearGrade
