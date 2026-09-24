import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreasePhysicalHarmNormalPowerWeapon = {
  id: "01a0d3e9-ec96-78e9-9f1a-bb83d345dbe8",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-physical-harm-normal-power-weapon",
  title: "Increase Physical Harm at Normal on Power Weapon",
  thing: "temper-jewelry-enchant/increase-physical-harm",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-power-weapon",
  value: 134,
} as const satisfies TemperGearGrade
