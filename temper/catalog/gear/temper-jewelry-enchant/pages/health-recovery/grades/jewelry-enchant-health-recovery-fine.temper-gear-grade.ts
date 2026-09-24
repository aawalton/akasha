import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantHealthRecoveryFine = {
  id: "01a0d3e9-2355-71fb-8175-b7964281c4e9",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-health-recovery-fine",
  title: "Health Recovery at Fine",
  thing: "temper-jewelry-enchant/health-recovery",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-health-recovery",
  value: 133,
} as const satisfies TemperGearGrade
