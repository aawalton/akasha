import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInvigoratingLegendaryHealthRecovery = {
  id: "01a0d3e9-6f45-7eb2-8b34-f65c06d3175b",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-invigorating-legendary-health-recovery",
  title: "Invigorating at Legendary on Health Recovery",
  thing: "temper-armor-trait/invigorating",
  quality: "temper-quality/legendary",
  metric: "temper-metric-tree/metric-health-recovery",
  value: 16,
  createdAt: "2026-09-24T14:54:46.085Z",
  updatedAt: "2026-09-24T14:54:57.000Z",
} as const satisfies TemperGearGrade
