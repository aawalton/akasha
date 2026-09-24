import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantFrostResistNormal = {
  id: "01a0d3e8-f4f9-73d8-bf86-54348006e64c",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-frost-resist-normal",
  title: "Frost Resist at Normal",
  thing: "temper-jewelry-enchant/frost-resist",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-resistance",
  value: 713,
} as const satisfies TemperGearGrade
