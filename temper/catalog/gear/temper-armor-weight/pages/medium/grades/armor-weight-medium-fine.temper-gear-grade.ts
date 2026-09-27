import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightMediumFine = {
  id: "01a0e0c4-2114-778f-9611-115cff824f4c",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-medium-fine",
  title: "Medium at Fine",
  thing: "temper-armor-weight/medium",
  quality: "temper-quality/fine",
  value: 245.5,
} as const satisfies TemperGearGrade
