import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantBashingFine = {
  id: "01a0d3e7-2ced-7bba-981f-7fc3eaebed5c",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-bashing-fine",
  title: "Bashing at Fine",
  thing: "temper-jewelry-enchant/bashing",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-bash-damage",
  value: 442,
} as const satisfies TemperGearGrade
