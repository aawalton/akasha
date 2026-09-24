import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceFeatCostSuperior = {
  id: "01a0d3ec-29a4-7b3c-9255-6872a2a04680",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-feat-cost-superior",
  title: "Reduce Feat Cost at Superior",
  thing: "temper-jewelry-enchant/reduce-feat-cost",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-stamina-ability-cost",
  value: 179,
} as const satisfies TemperGearGrade
