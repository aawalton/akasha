import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightShieldSuperior = {
  id: "01a0e0c4-2114-7d41-a13e-35eae6008f86",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-shield-superior",
  title: "Shield at Superior",
  thing: "temper-armor-weight/shield",
  quality: "temper-quality/superior",
  value: 1620,
} as const satisfies TemperGearGrade
