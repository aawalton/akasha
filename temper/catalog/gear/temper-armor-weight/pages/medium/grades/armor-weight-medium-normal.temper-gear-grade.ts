import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightMediumNormal = {
  id: "01a0e0c4-2114-7c50-ac90-5ad42175554f",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-medium-normal",
  title: "Medium at Normal",
  thing: "temper-armor-weight/medium",
  quality: "temper-quality/normal",
  value: 236.5,
} as const satisfies TemperGearGrade
