import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitBolsteredFine = {
  id: "01a0d3e7-a211-76cb-b558-007d3036a3f5",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-bolstered-fine",
  title: "Bolstered at Fine",
  thing: "temper-companion-trait/bolstered",
  quality: "temper-quality/fine",
  metric: "temper-companion-passive-metric/companion-damage-taken",
  value: 0.012,
  createdAt: "2026-09-24T14:52:48.017Z",
  updatedAt: "2026-09-24T14:53:42.000Z",
} as const satisfies TemperCompanionTraitGrade
