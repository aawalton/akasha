import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreaseMagicalHarmSuperiorPowerSpell = {
  id: "01a0d3e9-9371-7445-b9bc-432dbea9a66d",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-magical-harm-superior-power-spell",
  title: "Increase Magical Harm at Superior on Power Spell",
  thing: "temper-jewelry-enchant/increase-magical-harm",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-power-spell",
  value: 153,
} as const satisfies TemperGearGrade
