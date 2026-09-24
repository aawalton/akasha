import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantFlameResistNormal = {
  id: "01a0d3e8-36db-7a46-9f8f-beff2511d2cd",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-flame-resist-normal",
  title: "Flame Resist at Normal",
  thing: "temper-jewelry-enchant/flame-resist",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-resistance",
  value: 713,
} as const satisfies TemperGearGrade
