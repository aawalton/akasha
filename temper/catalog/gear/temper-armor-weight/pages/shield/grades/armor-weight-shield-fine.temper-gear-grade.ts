import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightShieldFine = {
  id: "01a0e0c4-2114-7231-932c-e8c115569313",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-shield-fine",
  title: "Shield at Fine",
  thing: "temper-armor-weight/shield",
  quality: "temper-quality/fine",
  value: 1620,
} as const satisfies TemperGearGrade
