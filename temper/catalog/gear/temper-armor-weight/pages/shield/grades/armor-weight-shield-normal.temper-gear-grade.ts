import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightShieldNormal = {
  id: "01a0e0c4-2114-7740-a05f-6853086d14a6",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-shield-normal",
  title: "Shield at Normal",
  thing: "temper-armor-weight/shield",
  quality: "temper-quality/normal",
  value: 1560,
} as const satisfies TemperGearGrade
