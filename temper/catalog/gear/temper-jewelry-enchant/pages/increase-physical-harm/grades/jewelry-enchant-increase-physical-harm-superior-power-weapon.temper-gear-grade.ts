import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreasePhysicalHarmSuperiorPowerWeapon = {
  id: "01a0d3e9-fe90-7631-a906-8061f09fb2bc",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-physical-harm-superior-power-weapon",
  title: "Increase Physical Harm at Superior on Power Weapon",
  thing: "temper-jewelry-enchant/increase-physical-harm",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-power-weapon",
  value: 153,
} as const satisfies TemperGearGrade
