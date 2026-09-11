import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const durationMs = {
  id: "01a06861-f664-78b6-bf59-b910c14b945d",
  type: "number-property",
  slug: "duration-ms",
  propertySlug: "duration-ms",
  definition: "how long a pull took, in milliseconds",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
