import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightLightSuperior = {
  id: "01a0e0c4-2114-7e47-8716-533c5add4321",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-light-superior",
  title: "Light at Superior",
  thing: "temper-armor-weight/light",
  quality: "temper-quality/superior",
  value: 164.5,
} as const satisfies TemperGearGrade
