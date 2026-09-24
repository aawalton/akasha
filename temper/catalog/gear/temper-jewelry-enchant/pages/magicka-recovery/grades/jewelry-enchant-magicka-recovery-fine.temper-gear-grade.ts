import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantMagickaRecoveryFine = {
  id: "01a0d3ea-5628-70b2-a340-c9b9a8967267",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-magicka-recovery-fine",
  title: "Magicka Recovery at Fine",
  thing: "temper-jewelry-enchant/magicka-recovery",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-magicka-recovery",
  value: 133,
} as const satisfies TemperGearGrade
