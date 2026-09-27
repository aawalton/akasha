import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightShieldLegendary = {
  id: "01a0e0c4-2114-7ba2-9f84-758c6a9d1c26",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-shield-legendary",
  title: "Shield at Legendary",
  thing: "temper-armor-weight/shield",
  quality: "temper-quality/legendary",
  value: 1720,
} as const satisfies TemperGearGrade
