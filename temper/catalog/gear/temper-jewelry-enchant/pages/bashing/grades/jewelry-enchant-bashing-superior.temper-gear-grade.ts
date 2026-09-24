import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantBashingSuperior = {
  id: "01a0d3e7-3ead-7efd-bf88-e47ee30f3a09",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-bashing-superior",
  title: "Bashing at Superior",
  thing: "temper-jewelry-enchant/bashing",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-bash-damage",
  value: 461,
} as const satisfies TemperGearGrade
