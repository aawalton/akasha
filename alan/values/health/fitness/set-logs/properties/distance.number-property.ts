import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type Distance = number

export const distance = {
  id: "01a0686a-a6ce-7e03-b4cf-27d6a32bb1b1",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "distance",
  propertySlug: "distance",
  definition: "how far a stretch of cardio covered, in miles",
  max: null,
} as const satisfies NumberProperty
