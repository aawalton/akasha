import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeAxeFine = {
  id: "01a0e0d2-8813-77dd-b341-7edf7ce9eedb",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-axe-fine",
  title: "Axe at Fine",
  thing: "temper-weapon-type/axe",
  quality: "temper-quality/fine",
  value: 1108,
} as const satisfies TemperGearGrade
