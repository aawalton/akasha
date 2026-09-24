import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantStaminaRecoveryFine = {
  id: "01a0d3ed-4a74-7313-827a-9c1a7bff29f5",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-stamina-recovery-fine",
  title: "Stamina Recovery at Fine",
  thing: "temper-jewelry-enchant/stamina-recovery",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-stamina-recovery",
  value: 133,
} as const satisfies TemperGearGrade
