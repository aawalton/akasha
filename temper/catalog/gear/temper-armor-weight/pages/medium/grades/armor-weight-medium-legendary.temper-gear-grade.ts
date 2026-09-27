import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightMediumLegendary = {
  id: "01a0e0c4-2114-76ab-b4db-1b02586271b7",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-medium-legendary",
  title: "Medium at Legendary",
  thing: "temper-armor-weight/medium",
  quality: "temper-quality/legendary",
  value: 260.5,
} as const satisfies TemperGearGrade
