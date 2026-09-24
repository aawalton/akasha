import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantDecreasePhysicalHarmLegendary = {
  id: "01a0d3e7-b066-7ed3-a342-0f7c2b04c484",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-decrease-physical-harm-legendary",
  title: "Decrease Physical Harm at Legendary",
  thing: "temper-jewelry-enchant/decrease-physical-harm",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-resistance",
  value: 927,
} as const satisfies TemperGearGrade
