import type { TemperEffectCategory } from "akasha/temper/catalog/effect/category/temper-effect-category.page-type.types.ts"

export const healing = {
  id: "01a0df69-d0ae-71bb-8f9c-e78f7c1ad8cc",
  type: "page-type/temper-effect-category",
  slug: "healing",
  key: "healing",
  title: "Healing",
  displayOrder: 1,
} as const satisfies TemperEffectCategory
