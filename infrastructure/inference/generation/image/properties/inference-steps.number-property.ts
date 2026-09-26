import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const inferenceSteps = {
  id: "01a0de80-955e-78d4-bbbc-61d6b2f242cb",
  type: "page-type/number-property",
  slug: "inference-steps",
  propertySlug: "steps",
  definition: "how many denoising steps a model service was asked to take",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
