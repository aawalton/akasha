import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const groupMaxMemoryMb = {
  id: "01a08bb3-8207-7d4e-a4db-1854125a3b39",
  type: "page-type/number-property",
  slug: "group-max-memory-mb",
  propertySlug: "max-memory-mb",
  definition: "the most memory a run of a group's code may hold, in megabytes",
  max: null,
  types: "ts",
  createdAt: "2026-09-10T14:23:12.391Z",
  updatedAt: "2026-09-22T10:06:53.000Z",
} as const satisfies NumberProperty
