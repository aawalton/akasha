import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitTriuneFineHealthMaximum = {
  id: "01a0d3eb-0170-7753-a0ba-667bbe17ef14",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-triune-fine-health-maximum",
  title: "Triune at Fine on Health Maximum",
  thing: "temper-jewelry-trait/triune",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-health-maximum",
  value: 410,
} as const satisfies TemperGearGrade
