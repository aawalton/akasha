import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantStaminaRecoveryEpic = {
  id: "01a0d3ed-41a1-755e-8e5b-d8c1479527f1",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-stamina-recovery-epic",
  title: "Stamina Recovery at Epic",
  thing: "temper-jewelry-enchant/stamina-recovery",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-stamina-recovery",
  value: 157,
} as const satisfies TemperGearGrade
