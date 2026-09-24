import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitBloodthirstyNormal = {
  id: "01a0d3e9-7d0b-76cb-b903-bc43c8a5e004",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-bloodthirsty-normal",
  title: "Bloodthirsty at Normal",
  thing: "temper-jewelry-trait/bloodthirsty",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-bloodthirsty",
  value: 280,
} as const satisfies TemperGearGrade
