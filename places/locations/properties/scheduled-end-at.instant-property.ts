import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export type ScheduledEndAt = string

export const scheduledEndAt = {
  id: "01a06583-acfb-739e-8d97-ad51783ebe95",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "scheduled-end-at",
  propertySlug: "scheduled-end-at",
  definition: "when the person is due to leave the place",
} as const satisfies InstantProperty
