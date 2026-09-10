import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type TrainsLengthenedRange = boolean

export const trainsLengthenedRange = {
  id: "01a0657e-2bc0-7519-942f-92178841ec74",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "trains-lengthened-range",
  propertySlug: "trains-lengthened-range",
  definition: "whether the movement loads the muscle at its longest",
} as const satisfies BooleanProperty
