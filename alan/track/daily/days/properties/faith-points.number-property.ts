import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type FaithPoints = number

export const faithPoints = {
  id: "01a05fd8-c30f-7380-851e-3a3d692c182a",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "faith-points",
  propertySlug: "faith-points",
  definition: "the faith earned on a day",
  max: null,
} as const satisfies NumberProperty
