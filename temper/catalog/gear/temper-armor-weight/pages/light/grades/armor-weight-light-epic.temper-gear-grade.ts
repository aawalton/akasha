import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightLightEpic = {
  id: "01a0e0c4-2114-7fd9-a801-46ff9e004866",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-light-epic",
  title: "Light at Epic",
  thing: "temper-armor-weight/light",
  quality: "temper-quality/epic",
  value: 168.5,
} as const satisfies TemperGearGrade
