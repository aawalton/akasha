import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightMediumSuperior = {
  id: "01a0e0c4-2114-7ee3-bcd3-8e9bd4c163df",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-medium-superior",
  title: "Medium at Superior",
  thing: "temper-armor-weight/medium",
  quality: "temper-quality/superior",
  value: 245.5,
} as const satisfies TemperGearGrade
