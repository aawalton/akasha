import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInvigoratingNormalStaminaRecovery = {
  id: "01a0d3e9-4c43-7633-a611-303415625536",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-invigorating-normal-stamina-recovery",
  title: "Invigorating at Normal on Stamina Recovery",
  thing: "temper-armor-trait/invigorating",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-stamina-recovery",
  value: 8,
  createdAt: "2026-09-24T14:54:37.123Z",
  updatedAt: "2026-09-24T14:54:57.000Z",
} as const satisfies TemperGearGrade
