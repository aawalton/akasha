import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInvigoratingSuperiorHealthRecovery = {
  id: "01a0d3e9-54e2-7d49-8ab8-76df89d3a7c7",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-invigorating-superior-health-recovery",
  title: "Invigorating at Superior on Health Recovery",
  thing: "temper-armor-trait/invigorating",
  quality: "temper-quality/superior",
  metric: "temper-metric-tree/metric-health-recovery",
  value: 12,
  createdAt: "2026-09-24T14:54:39.330Z",
  updatedAt: "2026-09-24T14:54:57.000Z",
} as const satisfies TemperGearGrade
