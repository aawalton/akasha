import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreaseMagicalHarmFinePowerSpell = {
  id: "01a0d3e9-6c42-710e-90ce-3f3e0934117b",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-magical-harm-fine-power-spell",
  title: "Increase Magical Harm at Fine on Power Spell",
  thing: "temper-jewelry-enchant/increase-magical-harm",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-power-spell",
  value: 141,
} as const satisfies TemperGearGrade
