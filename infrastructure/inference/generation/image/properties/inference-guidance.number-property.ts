import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const inferenceGuidance = {
  id: "01a0de80-955e-71f5-a11f-243b2a6629ee",
  type: "page-type/number-property",
  slug: "inference-guidance",
  propertySlug: "guidance",
  definition: "how closely a model service was asked to follow the prompt",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
