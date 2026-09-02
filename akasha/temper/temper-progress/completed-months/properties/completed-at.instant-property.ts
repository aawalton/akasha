import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type CompletedAt = string

export const completedAt = {
  id: "01a05fd3-4360-7ee7-a3d6-063adb7fe7f5",
  pageTypeSlug: "instant-property",
  slug: "completed-at",
  propertySlug: "completed-at",
  definition: "when a task was marked done",
} as const satisfies InstantProperty
