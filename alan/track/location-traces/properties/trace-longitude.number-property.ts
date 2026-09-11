import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const traceLongitude = {
  id: "01a06935-68b4-7dc7-bd4f-591607dcc576",
  type: "number-property",
  slug: "trace-longitude",
  propertySlug: "longitude",
  definition: "how far east or west of the meridian the trace was taken",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
