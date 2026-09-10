import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type GroupMaxCpuSeconds = number

export const groupMaxCpuSeconds = {
  id: "01a08bb3-5e69-75cb-8d94-70b459a24ce7",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "group-max-cpu-seconds",
  propertySlug: "max-cpu-seconds",
  definition: "the most processor time one run of a group's code may spend, in seconds",
  max: null,
} as const satisfies NumberProperty
