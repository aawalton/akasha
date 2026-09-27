import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTypeAxeEpic = {
  id: "01a0e0d2-8813-7448-aac4-03130dfa7aa4",
  type: "page-type/temper-gear-grade",
  slug: "weapon-type-axe-epic",
  title: "Axe at Epic",
  thing: "temper-weapon-type/axe",
  quality: "temper-quality/epic",
  value: 1132,
} as const satisfies TemperGearGrade
