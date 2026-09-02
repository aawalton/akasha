import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ActivityIndex = number

export const activityIndex = {
  id: "01a06167-3f9b-7003-a660-2e741cb204d9",
  pageTypeSlug: "number-property",
  slug: "activity-index",
  propertySlug: "activity-index",
  definition: "where an activity falls among the activities of one completion type",
  max: null,
} as const satisfies NumberProperty
