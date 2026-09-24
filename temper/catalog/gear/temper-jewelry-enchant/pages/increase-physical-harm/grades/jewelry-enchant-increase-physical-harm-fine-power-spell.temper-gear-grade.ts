import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantIncreasePhysicalHarmFinePowerSpell = {
  id: "01a0d3e9-d82c-7789-8097-af6b95883424",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-increase-physical-harm-fine-power-spell",
  title: "Increase Physical Harm at Fine on Power Spell",
  thing: "temper-jewelry-enchant/increase-physical-harm",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-power-spell",
  value: 141,
} as const satisfies TemperGearGrade
