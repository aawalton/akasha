import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const inferenceQuantize = {
  id: "01a0de80-955e-7205-800f-3243beed2d29",
  type: "page-type/number-property",
  slug: "inference-quantize",
  propertySlug: "quantize",
  definition: "the bits each weight a model service loaded was quantized to",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
