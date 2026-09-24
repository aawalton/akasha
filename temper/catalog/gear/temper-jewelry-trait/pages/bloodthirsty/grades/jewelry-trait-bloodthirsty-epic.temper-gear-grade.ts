import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitBloodthirstyEpic = {
  id: "01a0d3e9-6282-7f05-83f1-bae254f4b270",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-bloodthirsty-epic",
  title: "Bloodthirsty at Epic",
  thing: "temper-jewelry-trait/bloodthirsty",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-bloodthirsty",
  value: 332,
} as const satisfies TemperGearGrade
