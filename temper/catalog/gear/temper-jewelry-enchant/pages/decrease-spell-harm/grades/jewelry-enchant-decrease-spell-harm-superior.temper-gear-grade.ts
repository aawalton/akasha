import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantDecreaseSpellHarmSuperior = {
  id: "01a0d3e7-ddb3-7d48-ac9e-ce16a6ace5a7",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-decrease-spell-harm-superior",
  title: "Decrease Spell Harm at Superior",
  thing: "temper-jewelry-enchant/decrease-spell-harm",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-resistance",
  value: 805,
} as const satisfies TemperGearGrade
