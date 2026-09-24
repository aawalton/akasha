import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitBloodthirstyLegendary = {
  id: "01a0d3e9-8e9c-78e3-89ee-e3b112f9c24b",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-bloodthirsty-legendary",
  title: "Bloodthirsty at Legendary",
  thing: "temper-jewelry-trait/bloodthirsty",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-bloodthirsty",
  value: 350,
} as const satisfies TemperGearGrade
