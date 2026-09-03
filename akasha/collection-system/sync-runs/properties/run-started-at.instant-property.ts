import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type RunStartedAt = string

export const runStartedAt = {
  id: "01a06861-f664-7c01-8a3b-11d2a4e70002",
  pageTypeSlug: "instant-property",
  slug: "run-started-at",
  propertySlug: "run-started-at",
  definition: "when a pull began",
} as const satisfies InstantProperty
