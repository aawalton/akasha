import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantPrismaticRecoveryFineStaminaRecovery = {
  id: "01a0d3eb-7c40-77ec-94f1-b488a896ca77",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-prismatic-recovery-fine-stamina-recovery",
  title: "Prismatic Recovery at Fine on Stamina Recovery",
  thing: "temper-jewelry-enchant/prismatic-recovery",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-stamina-recovery",
  value: 71,
} as const satisfies TemperGearGrade
