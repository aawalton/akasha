import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const groundClearanceIn = {
  id: "01a0c545-f4f3-7208-8b9b-630c1b5bc010",
  type: "page-type/number-property",
  slug: "ground-clearance-in",
  propertySlug: "ground-clearance-in",
  definition: "how far the lowest part of the car sits above the road, in inches",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
