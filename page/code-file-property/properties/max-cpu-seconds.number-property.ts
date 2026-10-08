import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const maxCpuSeconds = {
  id: "01a08790-b6ce-71b1-8fb6-fab655bbd59f",
  type: "page-type/number-property",
  slug: "max-cpu-seconds",
  propertySlug: "max-cpu-seconds",
  definition: "the most processor time a run of the file may spend, in seconds",
  max: null,
  types: "ts",
  createdAt: "2026-09-09T19:06:43.278Z",
  updatedAt: "2026-09-22T10:06:58.000Z",
} as const satisfies NumberProperty
