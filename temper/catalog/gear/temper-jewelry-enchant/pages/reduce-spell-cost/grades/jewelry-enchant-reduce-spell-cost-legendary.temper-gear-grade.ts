import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceSpellCostLegendary = {
  id: "01a0d3ec-e6c4-77cc-b1c0-e5a1ed968ed7",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-spell-cost-legendary",
  title: "Reduce Spell Cost at Legendary",
  thing: "temper-jewelry-enchant/reduce-spell-cost",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-magicka-ability-cost",
  value: 203,
} as const satisfies TemperGearGrade
