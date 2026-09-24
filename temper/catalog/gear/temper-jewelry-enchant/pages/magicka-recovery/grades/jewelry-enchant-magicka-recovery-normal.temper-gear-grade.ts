import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantMagickaRecoveryNormal = {
  id: "01a0d3ea-5ee7-7aab-8f46-216a4ee9e346",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-magicka-recovery-normal",
  title: "Magicka Recovery at Normal",
  thing: "temper-jewelry-enchant/magicka-recovery",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-magicka-recovery",
  value: 121,
} as const satisfies TemperGearGrade
