import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantMagickaRecoverySuperior = {
  id: "01a0d3ea-6784-72f2-acd6-69d9e439a5a8",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-magicka-recovery-superior",
  title: "Magicka Recovery at Superior",
  thing: "temper-jewelry-enchant/magicka-recovery",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-magicka-recovery",
  value: 145,
} as const satisfies TemperGearGrade
