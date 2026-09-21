import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const tcoMaintenance = {
  id: "01a0c547-aabd-7255-a7c4-e7091a6baf40",
  type: "page-type/number-property",
  slug: "tco-maintenance",
  propertySlug: "tco-maintenance",
  definition: "what keeping the car serviced is reckoned to cost over those years, in dollars",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
