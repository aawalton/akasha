import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const inferenceHeight = {
  id: "01a0de80-955e-7502-9e98-7c3c71550d74",
  type: "page-type/number-property",
  slug: "inference-height",
  propertySlug: "height",
  definition: "the height in pixels a model service was asked to make",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
