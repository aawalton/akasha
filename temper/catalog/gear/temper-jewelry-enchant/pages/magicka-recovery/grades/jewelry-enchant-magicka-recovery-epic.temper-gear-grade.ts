import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantMagickaRecoveryEpic = {
  id: "01a0d3ea-4d1e-7b0b-8863-b9d0a3bc4d06",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-magicka-recovery-epic",
  title: "Magicka Recovery at Epic",
  thing: "temper-jewelry-enchant/magicka-recovery",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-magicka-recovery",
  value: 157,
} as const satisfies TemperGearGrade
