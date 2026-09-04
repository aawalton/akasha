import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type TrainsLengthenedRange = boolean

export const trainsLengthenedRange = {
  id: "01a0657e-2bc0-7519-942f-92178841ec74",
  pageTypeSlug: "boolean-property",
  slug: "trains-lengthened-range",
  propertySlug: "trains-lengthened-range",
  definition: "whether the movement loads the muscle at its longest",
} as const satisfies BooleanProperty
