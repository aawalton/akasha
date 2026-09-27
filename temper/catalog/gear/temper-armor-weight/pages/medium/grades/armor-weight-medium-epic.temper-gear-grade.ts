import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightMediumEpic = {
  id: "01a0e0c4-2114-7373-bf2a-06e7c9008c42",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-medium-epic",
  title: "Medium at Epic",
  thing: "temper-armor-weight/medium",
  quality: "temper-quality/epic",
  value: 251.5,
} as const satisfies TemperGearGrade
