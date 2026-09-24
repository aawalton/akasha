import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantDecreasePhysicalHarmNormal = {
  id: "01a0d3e7-9f3f-7517-8d57-fb350d82828c",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-decrease-physical-harm-normal",
  title: "Decrease Physical Harm at Normal",
  thing: "temper-jewelry-enchant/decrease-physical-harm",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-resistance",
  value: 713,
} as const satisfies TemperGearGrade
