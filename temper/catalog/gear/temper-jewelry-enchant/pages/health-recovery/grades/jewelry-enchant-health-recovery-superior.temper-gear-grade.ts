import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantHealthRecoverySuperior = {
  id: "01a0d3e9-330d-707d-b4f9-97b668f9b69a",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-health-recovery-superior",
  title: "Health Recovery at Superior",
  thing: "temper-jewelry-enchant/health-recovery",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-health-recovery",
  value: 145,
} as const satisfies TemperGearGrade
