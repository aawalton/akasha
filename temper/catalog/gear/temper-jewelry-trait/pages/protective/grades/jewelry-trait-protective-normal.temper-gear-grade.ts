import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const jewelryTraitProtectiveNormal = {
  id: "01a0d3ea-7032-7d86-bba0-317e83c7ecee",
  type: "page-type/temper-gear-grade",
  slug: "jewelry-trait-protective-normal",
  title: "Protective at Normal",
  thing: "temper-jewelry-trait/protective",
  quality: "temper-quality/normal",
  metric: "temper-metric-tree/metric-resistance",
  value: 1624,
} as const satisfies TemperGearGrade
