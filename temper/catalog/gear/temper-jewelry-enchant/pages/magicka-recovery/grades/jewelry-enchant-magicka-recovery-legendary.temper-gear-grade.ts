import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantMagickaRecoveryLegendary = {
  id: "01a0d3ea-704e-78ab-87ad-640b51fdbfd5",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-magicka-recovery-legendary",
  title: "Magicka Recovery at Legendary",
  thing: "temper-jewelry-enchant/magicka-recovery",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-magicka-recovery",
  value: 169,
} as const satisfies TemperGearGrade
