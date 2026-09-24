import type { TemperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.types.ts"

export const companionTraitShatteringSuperior = {
  id: "01a0d3e8-9c1e-7095-a059-48e3d19d2e56",
  type: "page-type/temper-companion-trait-grade",
  slug: "companion-trait-shattering-superior",
  title: "Shattering at Superior",
  thing: "temper-companion-trait/shattering",
  quality: "temper-quality/superior",
  metric: "temper-companion-passive-metric/companion-penetration",
  value: 1100,
} as const satisfies TemperCompanionTraitGrade
