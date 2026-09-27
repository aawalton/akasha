import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightHeavyNormal = {
  id: "01a0e0c4-2114-7cfb-88f6-df2bf0c822d3",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-heavy-normal",
  title: "Heavy at Normal",
  thing: "temper-armor-weight/heavy",
  quality: "temper-quality/normal",
  value: 314.5,
} as const satisfies TemperGearGrade
