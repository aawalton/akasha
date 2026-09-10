import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type OrangeAt = number

export const orangeAt = {
  id: "01a0544e-f1f2-7ad3-815b-1f7a924c6593",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "orange-at",
  propertySlug: "orange-at",
  definition: "the reading at which a scale turns orange",
  max: null,
} as const satisfies NumberProperty
