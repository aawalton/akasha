import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreasePhysicalHarmLegendaryPowerSpell = {
  id: "01a0d3ea-1c3e-7d69-86a5-94f5d2c68431",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-physical-harm-legendary-power-spell",
  title: "Increase Physical Harm at Legendary on Power Spell",
  thing: "temper-jewelry-enchant/increase-physical-harm",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-power-spell",
  value: 174,
} as const satisfies TemperGearGrade
