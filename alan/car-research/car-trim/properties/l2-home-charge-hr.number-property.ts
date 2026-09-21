import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const l2HomeChargeHr = {
  id: "01a0c546-36dd-7d33-ad06-007026ff6775",
  type: "page-type/number-property",
  slug: "l2-home-charge-hr",
  propertySlug: "l2-home-charge-hr",
  definition: "how long a level two home charger takes to fill the battery, in hours",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
