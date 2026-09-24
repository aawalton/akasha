import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantStaminaRecoveryLegendary = {
  id: "01a0d3ed-64f9-7f76-b91b-4bb522e11a99",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-stamina-recovery-legendary",
  title: "Stamina Recovery at Legendary",
  thing: "temper-jewelry-enchant/stamina-recovery",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-stamina-recovery",
  value: 169,
} as const satisfies TemperGearGrade
