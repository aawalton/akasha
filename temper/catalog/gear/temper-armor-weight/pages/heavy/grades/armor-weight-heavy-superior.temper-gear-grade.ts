import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightHeavySuperior = {
  id: "01a0e0c4-2114-732e-973d-acc40414566a",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-heavy-superior",
  title: "Heavy at Superior",
  thing: "temper-armor-weight/heavy",
  quality: "temper-quality/superior",
  value: 326.5,
} as const satisfies TemperGearGrade
