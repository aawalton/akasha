import type { NumberProperty } from "../../number-properties/number-property.page-type.ts"

export type MaxMemoryMb = number

export const maxMemoryMb = {
  id: "01a08790-d9b0-7541-af41-a057d8a7faab",
  pageTypeSlug: "number-property",
  slug: "max-memory-mb",
  propertySlug: "max-memory-mb",
  definition: "the most memory one run of the file may hold, in megabytes",
  max: null,
} as const satisfies NumberProperty
