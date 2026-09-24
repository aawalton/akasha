import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantBashingNormal = {
  id: "01a0d3e7-3596-7c8f-9693-ea1d16008c08",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-bashing-normal",
  title: "Bashing at Normal",
  thing: "temper-jewelry-enchant/bashing",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-bash-damage",
  value: 422,
} as const satisfies TemperGearGrade
