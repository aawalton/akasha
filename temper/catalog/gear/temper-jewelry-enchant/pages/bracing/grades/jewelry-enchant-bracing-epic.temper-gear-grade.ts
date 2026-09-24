import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantBracingEpic = {
  id: "01a0d3e7-4de9-70f4-91d8-6b1ac53fe846",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-bracing-epic",
  title: "Bracing at Epic",
  thing: "temper-jewelry-enchant/bracing",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-stamina-block-cost",
  value: -191,
} as const satisfies TemperGearGrade
