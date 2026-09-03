import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type RunCompletedAt = string

export const runCompletedAt = {
  id: "01a06861-f664-7c01-8a3b-11d2a4e70003",
  pageTypeSlug: "instant-property",
  slug: "run-completed-at",
  propertySlug: "run-completed-at",
  definition: "when a pull stopped, whether it finished or died",
} as const satisfies InstantProperty
