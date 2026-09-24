import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantDecreaseSpellHarmFine = {
  id: "01a0d3e7-c2cd-7b33-b60d-4e2eca2eb993",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-decrease-spell-harm-fine",
  title: "Decrease Spell Harm at Fine",
  thing: "temper-jewelry-enchant/decrease-spell-harm",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-resistance",
  value: 744,
} as const satisfies TemperGearGrade
