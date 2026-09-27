import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightLightNormal = {
  id: "01a0e0c4-2114-76e6-b6e2-7d4afeda0df7",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-light-normal",
  title: "Light at Normal",
  thing: "temper-armor-weight/light",
  quality: "temper-quality/normal",
  value: 158.5,
} as const satisfies TemperGearGrade
