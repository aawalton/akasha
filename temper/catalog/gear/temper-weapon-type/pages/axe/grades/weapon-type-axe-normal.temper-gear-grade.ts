import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeAxeNormal = {
  id: "01a0e0d2-8813-76aa-b5a2-0a968e1b1fa1",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-axe-normal",
  title: "Axe at Normal",
  thing: "temper-weapon-type/axe",
  quality: "temper-quality/normal",
  value: 1072,
} as const satisfies TemperGearGrade
