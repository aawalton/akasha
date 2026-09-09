import type { NumberProperty } from "../../number-properties/number-property.page-type.ts"

export type MaxCpuSeconds = number

export const maxCpuSeconds = {
  id: "01a08790-b6ce-71b1-8fb6-fab655bbd59f",
  pageTypeSlug: "number-property",
  slug: "max-cpu-seconds",
  propertySlug: "max-cpu-seconds",
  definition: "the most processor time one run of the file may spend, in seconds",
  max: null,
} as const satisfies NumberProperty
