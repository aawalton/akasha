import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantStaminaRecoveryNormal = {
  id: "01a0d3ed-5312-7e2e-8f43-e13fea650844",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-stamina-recovery-normal",
  title: "Stamina Recovery at Normal",
  thing: "temper-jewelry-enchant/stamina-recovery",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-stamina-recovery",
  value: 121,
} as const satisfies TemperGearGrade
