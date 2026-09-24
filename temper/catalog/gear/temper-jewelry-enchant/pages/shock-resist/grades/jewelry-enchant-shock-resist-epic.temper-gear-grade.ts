import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantShockResistEpic = {
  id: "01a0d3ec-ef85-713e-af27-7e03824eb239",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-shock-resist-epic",
  title: "Shock Resist at Epic",
  thing: "temper-jewelry-enchant/shock-resist",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-resistance",
  value: 856,
} as const satisfies TemperGearGrade
