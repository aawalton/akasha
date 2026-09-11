import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const gpuScore = {
  id: "01a0658c-329a-780e-b6f1-9356bce1f913",
  type: "number-property",
  slug: "gpu-score",
  propertySlug: "gpu-score",
  definition: "how the graphics card benchmarks",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
