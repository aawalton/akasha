import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightLightFine = {
  id: "01a0e0c4-2114-73fc-8d33-bf91ad666567",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-light-fine",
  title: "Light at Fine",
  thing: "temper-armor-weight/light",
  quality: "temper-quality/fine",
  value: 164.5,
} as const satisfies TemperGearGrade
