import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const odometerM = {
  id: "01a06935-68b4-7ba8-ae6b-0d71860e38e9",
  type: "page-type/number-property",
  slug: "odometer-m",
  propertySlug: "odometer-m",
  definition: "how far the device has travelled since it started counting, in metres",
  max: null,
  types: "ts",
  createdAt: "2026-09-03T21:38:23.028Z",
  updatedAt: "2026-09-21T19:18:52.000Z",
} as const satisfies NumberProperty
