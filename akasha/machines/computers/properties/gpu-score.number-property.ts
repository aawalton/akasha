import type { NumberProperty } from "@akasha/pages-system/number-property"

export type GpuScore = number

export const gpuScore = {
  id: "01a0658c-329a-780e-b6f1-9356bce1f913",
  pageTypeSlug: "number-property",
  slug: "gpu-score",
  propertySlug: "gpu-score",
  definition: "how the graphics card benchmarks",
  max: null,
} as const satisfies NumberProperty
