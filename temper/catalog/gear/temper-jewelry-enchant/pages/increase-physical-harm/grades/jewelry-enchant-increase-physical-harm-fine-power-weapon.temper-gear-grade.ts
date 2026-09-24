import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreasePhysicalHarmFinePowerWeapon = {
  id: "01a0d3e9-ce6b-77df-979b-8eb04a42e590",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-physical-harm-fine-power-weapon",
  title: "Increase Physical Harm at Fine on Power Weapon",
  thing: "temper-jewelry-enchant/increase-physical-harm",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-power-weapon",
  value: 141,
} as const satisfies TemperGearGrade
