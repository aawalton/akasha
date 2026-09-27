import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightHeavyEpic = {
  id: "01a0e0c4-2114-751f-9a46-f6d456a45020",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-heavy-epic",
  title: "Heavy at Epic",
  thing: "temper-armor-weight/heavy",
  quality: "temper-quality/epic",
  value: 334.5,
} as const satisfies TemperGearGrade
