import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const topSpeedMph = {
  id: "01a0c547-de2b-7e34-b768-718dcaefa643",
  type: "page-type/number-property",
  slug: "top-speed-mph",
  propertySlug: "top-speed-mph",
  definition: "the fastest the car goes, in miles an hour",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
