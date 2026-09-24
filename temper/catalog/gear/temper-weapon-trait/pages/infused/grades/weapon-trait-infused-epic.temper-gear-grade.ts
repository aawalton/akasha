import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitInfusedEpic = {
  id: "01a0d3e9-0736-74d1-a209-200a768d677c",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-infused-epic",
  title: "Infused at Epic",
  thing: "temper-weapon-trait/infused",
  quality: "temper-quality/epic",
  value: 0.25,
} as const satisfies TemperGearGrade
