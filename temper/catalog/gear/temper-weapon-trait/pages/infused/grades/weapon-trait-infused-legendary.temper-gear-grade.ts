import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const weaponTraitInfusedLegendary = {
  id: "01a0d3e9-2dec-7ddc-99bb-be427166b157",
  type: "page-type/temper-gear-grade",
  slug: "weapon-trait-infused-legendary",
  title: "Infused at Legendary",
  thing: "temper-weapon-trait/infused",
  quality: "temper-quality/legendary",
  value: 0.3,
} as const satisfies TemperGearGrade
