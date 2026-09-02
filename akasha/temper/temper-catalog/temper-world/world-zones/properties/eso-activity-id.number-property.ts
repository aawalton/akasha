import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EsoActivityId = number

export const esoActivityId = {
  id: "01a06167-3f9b-7004-95fb-a1c63b19f807",
  pageTypeSlug: "number-property",
  slug: "eso-activity-id",
  propertySlug: "eso-activity-id",
  definition: "the number the game gives a completion activity",
  max: null,
} as const satisfies NumberProperty
