import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInvigoratingFineHealthRecovery = {
  id: "01a0d3e9-1738-72a7-87d5-5597a99145de",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-invigorating-fine-health-recovery",
  title: "Invigorating at Fine on Health Recovery",
  thing: "temper-armor-trait/invigorating",
  quality: "temper-quality/fine",
  metric: "temper-metric-tree/metric-health-recovery",
  value: 10,
  createdAt: "2026-09-24T14:54:23.544Z",
  updatedAt: "2026-09-24T14:54:57.000Z",
} as const satisfies TemperGearGrade
