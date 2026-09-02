import type { NumberProperty } from "@akasha/pages-system/number-property"

export type TaskPoints = number

export const taskPoints = {
  id: "01a05fd8-c30f-7ebe-83c4-d48c831a7151",
  pageTypeSlug: "number-property",
  slug: "task-points",
  propertySlug: "task-points",
  definition: "the difficulty score of the to-do rounds finished on a day",
  max: null,
} as const satisfies NumberProperty
