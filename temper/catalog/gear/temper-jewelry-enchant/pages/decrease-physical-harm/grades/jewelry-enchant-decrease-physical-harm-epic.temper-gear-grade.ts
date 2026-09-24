import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantDecreasePhysicalHarmEpic = {
  id: "01a0d3e7-8209-7304-8b7d-400ec7e84b4b",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-decrease-physical-harm-epic",
  title: "Decrease Physical Harm at Epic",
  thing: "temper-jewelry-enchant/decrease-physical-harm",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-resistance",
  value: 856,
} as const satisfies TemperGearGrade
