import type { NumberProperty } from "@akasha/pages/number-property"

export type FitnessCoachingNoteSortOrder = number

export const fitnessCoachingNoteSortOrder = {
  id: "01a0657a-fe00-7033-a6a0-27db2cfe8791",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "fitness-coaching-note-sort-order",
  propertySlug: "sort-order",
  definition: "where a note sits when they are read as a list",
  max: null,
} as const satisfies NumberProperty
