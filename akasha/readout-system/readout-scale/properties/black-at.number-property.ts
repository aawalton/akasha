import type { NumberProperty } from "../../../pages-system/number-property/number-property.page-type.ts"

export type BlackAt = number

export const blackAt = {
  id: "01a0544e-f1f0-768d-a7d6-b32d64b20ddc",
  pageTypeSlug: "number-property",
  slug: "black-at",
  propertySlug: "black-at",
  definition: "the reading at which a scale turns black",
  max: null,
} as const satisfies NumberProperty
