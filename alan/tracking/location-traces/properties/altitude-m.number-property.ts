import type { NumberProperty } from "@akasha/pages-system/number-property"

export type AltitudeM = number

export const altitudeM = {
  id: "01a06935-68b3-78dc-87ae-e65beefa66fa",
  pageTypeSlug: "number-property",
  slug: "altitude-m",
  propertySlug: "altitude-m",
  definition: "how far above sea level the trace was taken, in metres",
  max: null,
} as const satisfies NumberProperty
