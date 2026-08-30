import type { NumberProperty } from "../../../pages-system/number-property/number-property.page-type.ts"

export type GreenAt = number

export const greenAt = {
  id: "01a0544e-f1f4-706f-9038-612954f7ffde",
  pageTypeSlug: "number-property",
  slug: "green-at",
  propertySlug: "green-at",
  definition: "the reading at which a scale turns green",
  max: null,
} as const satisfies NumberProperty
