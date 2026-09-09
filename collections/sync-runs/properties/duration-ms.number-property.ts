import type { NumberProperty } from "@akasha/pages/number-property"

export type DurationMs = number

export const durationMs = {
  id: "01a06861-f664-78b6-bf59-b910c14b945d",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "duration-ms",
  propertySlug: "duration-ms",
  definition: "how long a pull took, in milliseconds",
  max: null,
} as const satisfies NumberProperty
