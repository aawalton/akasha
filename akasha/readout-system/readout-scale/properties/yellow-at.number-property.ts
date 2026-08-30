import type { NumberProperty } from "../../../pages-system/number-property/number-property.page-type.ts"

export type YellowAt = number

export const yellowAt = {
  id: "01a0544e-f1f3-789d-8800-4f003a1e21c9",
  pageTypeSlug: "number-property",
  slug: "yellow-at",
  propertySlug: "yellow-at",
  definition: "the reading at which a scale turns yellow",
  max: null,
} as const satisfies NumberProperty
