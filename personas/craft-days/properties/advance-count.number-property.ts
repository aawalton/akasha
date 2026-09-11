import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const advanceCount = {
  id: "01a0655b-4a9b-7007-8688-e6360abfa930",
  type: "number-property",
  slug: "advance-count",
  propertySlug: "advance-count",
  definition: "how many steps the craft moved forward on a day",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
