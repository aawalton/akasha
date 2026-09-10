import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type EventCount = number

export const eventCount = {
  id: "01a0657a-9ccd-7a56-8e7f-edaa21e21771",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "event-count",
  propertySlug: "event-count",
  definition: "how many times a story changes what a character has",
  max: null,
} as const satisfies NumberProperty
