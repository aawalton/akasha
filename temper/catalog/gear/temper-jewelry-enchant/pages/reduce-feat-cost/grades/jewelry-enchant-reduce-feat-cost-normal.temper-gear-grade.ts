import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceFeatCostNormal = {
  id: "01a0d3ec-20e3-77dd-9f81-1742f27ea276",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-feat-cost-normal",
  title: "Reduce Feat Cost at Normal",
  thing: "temper-jewelry-enchant/reduce-feat-cost",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-stamina-ability-cost",
  value: 154,
} as const satisfies TemperGearGrade
