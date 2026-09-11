import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const groupMaxMemoryMb = {
  id: "01a08bb3-8207-7d4e-a4db-1854125a3b39",
  type: "number-property",
  slug: "group-max-memory-mb",
  propertySlug: "max-memory-mb",
  definition: "the most memory one run of a group's code may hold, in megabytes",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
