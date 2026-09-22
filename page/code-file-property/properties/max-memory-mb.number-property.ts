import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const maxMemoryMb = {
  id: "01a08790-d9b0-7541-af41-a057d8a7faab",
  type: "page-type/number-property",
  slug: "max-memory-mb",
  propertySlug: "max-memory-mb",
  definition: "the most memory a run of the file may hold, in megabytes",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
