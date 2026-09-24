import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreasePhysicalHarmEpicPowerWeapon = {
  id: "01a0d3e9-bc00-749f-a1a6-11510dbeab59",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-physical-harm-epic-power-weapon",
  title: "Increase Physical Harm at Epic on Power Weapon",
  thing: "temper-jewelry-enchant/increase-physical-harm",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-power-weapon",
  value: 160,
} as const satisfies TemperGearGrade
