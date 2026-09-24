import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreasePhysicalHarmSuperiorPowerSpell = {
  id: "01a0d3ea-08a3-7c76-9883-9f2eed05c728",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-physical-harm-superior-power-spell",
  title: "Increase Physical Harm at Superior on Power Spell",
  thing: "temper-jewelry-enchant/increase-physical-harm",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-power-spell",
  value: 153,
} as const satisfies TemperGearGrade
