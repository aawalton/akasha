import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreasePhysicalHarmLegendaryPowerWeapon = {
  id: "01a0d3ea-127b-7214-8112-86597d7922dc",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-physical-harm-legendary-power-weapon",
  title: "Increase Physical Harm at Legendary on Power Weapon",
  thing: "temper-jewelry-enchant/increase-physical-harm",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-power-weapon",
  value: 174,
} as const satisfies TemperGearGrade
