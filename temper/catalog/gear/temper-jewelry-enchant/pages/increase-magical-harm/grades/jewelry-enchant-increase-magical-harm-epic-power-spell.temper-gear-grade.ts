import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreaseMagicalHarmEpicPowerSpell = {
  id: "01a0d3e9-4f46-7379-a862-e3600ddbbdd6",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-magical-harm-epic-power-spell",
  title: "Increase Magical Harm at Epic on Power Spell",
  thing: "temper-jewelry-enchant/increase-magical-harm",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-power-spell",
  value: 160,
} as const satisfies TemperGearGrade
