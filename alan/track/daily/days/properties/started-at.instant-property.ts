import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export type StartedAt = string

export const startedAt = {
  id: "01a060fb-040f-70dd-87ef-b0cf1edb41cb",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "started-at",
  propertySlug: "started-at",
  definition: "when the stretch a reading covers began",
} as const satisfies InstantProperty
