import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInvigoratingEpicHealthRecovery = {
  id: "01a0d3e8-fc80-7e27-9066-c48b64c77b7e",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-invigorating-epic-health-recovery",
  title: "Invigorating at Epic on Health Recovery",
  thing: "temper-armor-trait/invigorating",
  quality: "temper-quality/epic",
  metric: "temper-metric-tree/metric-health-recovery",
  value: 14,
  createdAt: "2026-09-24T14:54:16.704Z",
  updatedAt: "2026-09-24T14:54:57.000Z",
} as const satisfies TemperGearGrade
