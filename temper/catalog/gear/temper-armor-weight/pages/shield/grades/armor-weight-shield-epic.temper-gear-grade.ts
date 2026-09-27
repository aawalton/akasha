import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightShieldEpic = {
  id: "01a0e0c4-2114-72cf-ab69-31f86f3ee0fe",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-shield-epic",
  title: "Shield at Epic",
  thing: "temper-armor-weight/shield",
  quality: "temper-quality/epic",
  value: 1660,
} as const satisfies TemperGearGrade
