import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantStaminaRecoverySuperior = {
  id: "01a0d3ed-5d59-7daf-be53-40a4e1a72d08",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-stamina-recovery-superior",
  title: "Stamina Recovery at Superior",
  thing: "temper-jewelry-enchant/stamina-recovery",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-stamina-recovery",
  value: 145,
} as const satisfies TemperGearGrade
