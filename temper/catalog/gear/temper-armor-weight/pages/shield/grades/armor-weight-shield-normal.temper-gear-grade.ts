import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorWeightShieldNormal = {
  id: "01a0e0c4-2114-7740-a05f-6853086d14a6",
  type: "page-type/temper-gear-grade",
  slug: "armor-weight-shield-normal",
  title: "Shield at Normal",
  thing: "temper-armor-weight/shield",
  quality: "temper-quality/normal",
  value: 1500,
  createdAt: "2026-09-27T02:49:05.044Z",
  updatedAt: "2026-10-20T17:32:17.386Z",
} as const satisfies TemperGearGrade
