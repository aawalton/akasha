import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantDecreasePhysicalHarmSuperior = {
  id: "01a0d3e7-a7cb-7bc4-b83b-2f650ecf4902",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-decrease-physical-harm-superior",
  title: "Decrease Physical Harm at Superior",
  thing: "temper-jewelry-enchant/decrease-physical-harm",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-resistance",
  value: 805,
} as const satisfies TemperGearGrade
