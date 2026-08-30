import type { NumberProperty } from "../../../pages-system/number-property/number-property.page-type.ts"

export type RedAt = number

export const redAt = {
  id: "01a0544e-f1f1-7205-888f-421a9c4cfdb4",
  pageTypeSlug: "number-property",
  slug: "red-at",
  propertySlug: "red-at",
  definition: "the reading at which a scale turns red",
  max: null,
} as const satisfies NumberProperty
