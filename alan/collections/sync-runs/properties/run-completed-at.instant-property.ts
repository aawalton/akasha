import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export const runCompletedAt = {
  id: "01a06861-f664-7c01-8a3b-11d2a4e70003",
  type: "instant-property",
  slug: "run-completed-at",
  propertySlug: "run-completed-at",
  definition: "when a pull stopped, whether it finished or died",
  types: "ts",
} as const satisfies InstantProperty
