import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPoisonResistSuperior = {
  id: "01a0d3ea-9b37-708e-954e-63c04a1710c2",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-poison-resist-superior",
  title: "Poison Resist at Superior",
  thing: "temper-jewelry-enchant/poison-resist",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-resistance",
  value: 805,
} as const satisfies TemperGearGrade
