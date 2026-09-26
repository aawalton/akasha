import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const inferenceWidth = {
  id: "01a0de80-955e-7886-809b-8e840da8d33c",
  type: "page-type/number-property",
  slug: "inference-width",
  propertySlug: "width",
  definition: "the width in pixels a model service was asked to make",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
