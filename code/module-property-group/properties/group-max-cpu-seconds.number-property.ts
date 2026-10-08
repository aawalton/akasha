import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const groupMaxCpuSeconds = {
  id: "01a08bb3-5e69-75cb-8d94-70b459a24ce7",
  type: "page-type/number-property",
  slug: "group-max-cpu-seconds",
  propertySlug: "max-cpu-seconds",
  definition: "the most processor time a run of a group's code may spend, in seconds",
  max: null,
  types: "ts",
  createdAt: "2026-09-10T14:23:03.273Z",
  updatedAt: "2026-09-22T10:05:48.000Z",
} as const satisfies NumberProperty
