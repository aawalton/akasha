import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryEnchantHealthRecoveryNormal = {
  id: "01a0d3e9-2bec-744a-bc65-bfdb37405c70",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-enchant-health-recovery-normal",
  title: "Health Recovery at Normal",
  thing: "temper-jewelry-enchant/health-recovery",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-health-recovery",
  value: 121,
  createdAt: "2026-09-24T14:54:28.844Z",
  updatedAt: "2026-09-24T14:55:36.000Z",
} as const satisfies TemperGearGrade
