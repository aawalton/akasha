import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const taskPoints = {
  id: "01a05fd8-c30f-7ebe-83c4-d48c831a7151",
  type: "page-type/number-property",
  slug: "task-points",
  propertySlug: "task-points",
  definition: "the difficulty score of the to-do rounds finished on a day",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
