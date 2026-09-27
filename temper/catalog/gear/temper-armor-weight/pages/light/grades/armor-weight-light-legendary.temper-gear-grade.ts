import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightLightLegendary = {
  id: "01a0e0c4-2114-7907-a68c-df92f4ebabff",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-light-legendary",
  title: "Light at Legendary",
  thing: "temper-armor-weight/light",
  quality: "temper-quality/legendary",
  value: 174.5,
} as const satisfies TemperGearGrade
