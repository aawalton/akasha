import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantReduceSpellCostFine = {
  id: "01a0d3ec-c1f4-7815-8978-c011e2d4226a",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-reduce-spell-cost-fine",
  title: "Reduce Spell Cost at Fine",
  thing: "temper-jewelry-enchant/reduce-spell-cost",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-magicka-ability-cost",
  value: 167,
  createdAt: "2026-09-24T14:58:23.860Z",
  updatedAt: "2026-09-24T14:58:51.000Z",
} as const satisfies TemperGearGrade
