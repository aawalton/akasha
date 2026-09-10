import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type CpuScore = number

export const cpuScore = {
  id: "01a0658c-329a-788d-bd84-f7e224dd7dda",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "cpu-score",
  propertySlug: "cpu-score",
  definition: "how the processor benchmarks",
  max: null,
} as const satisfies NumberProperty
