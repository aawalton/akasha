import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantDecreasePhysicalHarmFine = {
  id: "01a0d3e7-8ac4-77b1-86a1-619efa92a6f8",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-decrease-physical-harm-fine",
  title: "Decrease Physical Harm at Fine",
  thing: "temper-jewelry-enchant/decrease-physical-harm",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-resistance",
  value: 744,
} as const satisfies TemperGearGrade
