import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitChargedNormal = {
  id: "01a0d3e8-3828-7627-a5bc-abf1dab98dd1",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-charged-normal",
  title: "Charged at Normal",
  thing: "temper-weapon-trait/charged",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-status-effect-chance",
  value: 0.975,
} as const satisfies TemperGearGrade
