import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantBashingEpic = {
  id: "01a0d3e7-1b16-799b-b130-f010e6ea0225",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-bashing-epic",
  title: "Bashing at Epic",
  thing: "temper-jewelry-enchant/bashing",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-bash-damage",
  value: 481,
} as const satisfies TemperGearGrade
