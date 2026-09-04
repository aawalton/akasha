import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CoachingConstraintSortOrder = number

export const coachingConstraintSortOrder = {
  id: "01a0657a-fe00-7033-a6a0-27db2cfe8791",
  pageTypeSlug: "number-property",
  slug: "coaching-constraint-sort-order",
  propertySlug: "coaching-constraint-sort-order",
  definition: "where the constraint sits when they are read as a list",
  max: null,
} as const satisfies NumberProperty
