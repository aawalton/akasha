import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const inferenceSeed = {
  id: "01a0de80-955e-77c4-b3ee-42148b7919c6",
  type: "page-type/number-property",
  slug: "inference-seed",
  propertySlug: "seed",
  definition: "the seed a model service was handed to make a thing",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
