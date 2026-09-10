import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export type ScheduledStartAt = string

export const scheduledStartAt = {
  id: "01a06583-acfb-73ae-b66c-ba755708a687",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "scheduled-start-at",
  propertySlug: "scheduled-start-at",
  definition: "when the person is due at the place",
} as const satisfies InstantProperty
