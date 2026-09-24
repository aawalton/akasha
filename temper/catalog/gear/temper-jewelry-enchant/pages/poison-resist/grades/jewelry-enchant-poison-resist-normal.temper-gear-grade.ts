import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPoisonResistNormal = {
  id: "01a0d3ea-9421-7e41-b4b8-146628865660",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-poison-resist-normal",
  title: "Poison Resist at Normal",
  thing: "temper-jewelry-enchant/poison-resist",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-resistance",
  value: 713,
} as const satisfies TemperGearGrade
