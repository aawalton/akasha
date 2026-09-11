import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const groupMaxWallSeconds = {
  id: "01a08bb3-7020-78bf-b50e-899b7d794a86",
  type: "number-property",
  slug: "group-max-wall-seconds",
  propertySlug: "max-wall-seconds",
  definition: "the most clock time one run of a group's code may take, in seconds",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
