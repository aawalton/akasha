import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreaseMagicalHarmEpicPowerWeapon = {
  id: "01a0d3e9-45f6-70be-80de-c37c7e3ea7b2",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-magical-harm-epic-power-weapon",
  title: "Increase Magical Harm at Epic on Power Weapon",
  thing: "temper-jewelry-enchant/increase-magical-harm",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-power-weapon",
  value: 160,
} as const satisfies TemperGearGrade
