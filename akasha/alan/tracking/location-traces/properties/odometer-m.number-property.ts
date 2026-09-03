import type { NumberProperty } from "@akasha/pages-system/number-property"

export type OdometerM = number

export const odometerM = {
  id: "01a06935-68b4-7ba8-ae6b-0d71860e38e9",
  pageTypeSlug: "number-property",
  slug: "odometer-m",
  propertySlug: "odometer-m",
  definition: "how far the device has travelled since it started counting, in metres",
  max: null,
} as const satisfies NumberProperty
