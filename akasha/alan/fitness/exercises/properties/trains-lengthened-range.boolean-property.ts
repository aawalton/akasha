import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type TrainsLengthenedRange = boolean

export const trainsLengthenedRange = {
  id: "01a0657b-1ad2-7f1e-999d-3b48aa3035a9",
  pageTypeSlug: "boolean-property",
  slug: "trains-lengthened-range",
  propertySlug: "trains-lengthened-range",
  definition: "whether the movement loads the muscle at its longest",
} as const satisfies BooleanProperty
