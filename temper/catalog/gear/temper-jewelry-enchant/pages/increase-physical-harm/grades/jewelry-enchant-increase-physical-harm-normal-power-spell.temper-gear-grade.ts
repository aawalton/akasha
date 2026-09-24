import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreasePhysicalHarmNormalPowerSpell = {
  id: "01a0d3e9-f612-76b7-ad11-2668cfa84e3d",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-physical-harm-normal-power-spell",
  title: "Increase Physical Harm at Normal on Power Spell",
  thing: "temper-jewelry-enchant/increase-physical-harm",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-power-spell",
  value: 134,
} as const satisfies TemperGearGrade
