import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type ScheduledStart = string

export const scheduledStart = {
  id: "01a06583-acfb-73ae-b66c-ba755708a687",
  pageTypeSlug: "instant-property",
  slug: "scheduled-start",
  propertySlug: "scheduled-start",
  definition: "when the person is due at the place",
} as const satisfies InstantProperty
