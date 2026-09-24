import type { TemperGearGrade } from "akasha/temper/catalog/gear/grade/temper-gear-grade.page-type.types.ts"

export const armorTraitInfusedNormal = {
  id: "01a0d3e8-da3c-7716-a624-ac2c1fe2ff5a",
  type: "page-type/temper-gear-grade",
  slug: "armor-trait-infused-normal",
  title: "Infused at Normal",
  thing: "temper-armor-trait/infused",
  quality: "temper-quality/normal",
  value: 0.09,
} as const satisfies TemperGearGrade
