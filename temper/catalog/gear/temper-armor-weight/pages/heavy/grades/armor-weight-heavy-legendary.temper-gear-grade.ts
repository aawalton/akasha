import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightHeavyLegendary = {
  id: "01a0e0c4-2114-7295-acb5-639534d0aa70",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-heavy-legendary",
  title: "Heavy at Legendary",
  thing: "temper-armor-weight/heavy",
  quality: "temper-quality/legendary",
  value: 346.5,
} as const satisfies TemperGearGrade
