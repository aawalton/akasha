import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const maxWallSeconds = {
  id: "01a08790-c7ec-7749-b14a-e818de74aed8",
  type: "page-type/number-property",
  slug: "max-wall-seconds",
  propertySlug: "max-wall-seconds",
  definition: "the most time a run of the file may take, in seconds",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
