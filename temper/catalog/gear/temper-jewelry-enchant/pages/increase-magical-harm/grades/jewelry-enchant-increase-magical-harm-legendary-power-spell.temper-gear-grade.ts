import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreaseMagicalHarmLegendaryPowerSpell = {
  id: "01a0d3e9-b104-7716-8c2e-cacc0345e564",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-magical-harm-legendary-power-spell",
  title: "Increase Magical Harm at Legendary on Power Spell",
  thing: "temper-jewelry-enchant/increase-magical-harm",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-power-spell",
  value: 174,
} as const satisfies TemperGearGrade
