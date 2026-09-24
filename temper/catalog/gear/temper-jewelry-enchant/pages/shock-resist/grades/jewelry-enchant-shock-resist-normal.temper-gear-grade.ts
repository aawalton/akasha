import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantShockResistNormal = {
  id: "01a0d3ed-00f7-7249-b6c1-805eab0cf8a4",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-shock-resist-normal",
  title: "Shock Resist at Normal",
  thing: "temper-jewelry-enchant/shock-resist",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-resistance",
  value: 713,
} as const satisfies TemperGearGrade
