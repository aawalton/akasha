import type { NumberProperty } from "@akasha/pages-system/number-property"

export type TraceLongitude = number

export const traceLongitude = {
  id: "01a06935-68b4-7dc7-bd4f-591607dcc576",
  pageTypeSlug: "number-property",
  slug: "trace-longitude",
  propertySlug: "longitude",
  definition: "how far east or west of the meridian the trace was taken",
  max: null,
} as const satisfies NumberProperty
