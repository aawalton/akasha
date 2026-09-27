import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightHeavyFine = {
  id: "01a0e0c4-2114-79ed-82e9-b69478e76647",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-heavy-fine",
  title: "Heavy at Fine",
  thing: "temper-armor-weight/heavy",
  quality: "temper-quality/fine",
  value: 326.5,
} as const satisfies TemperGearGrade
