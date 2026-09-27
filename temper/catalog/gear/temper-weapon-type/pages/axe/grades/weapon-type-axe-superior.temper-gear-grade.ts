import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeAxeSuperior = {
  id: "01a0e0d2-8813-7fc8-9df3-2762a535a003",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-axe-superior",
  title: "Axe at Superior",
  thing: "temper-weapon-type/axe",
  quality: "temper-quality/superior",
  value: 1108,
} as const satisfies TemperGearGrade
