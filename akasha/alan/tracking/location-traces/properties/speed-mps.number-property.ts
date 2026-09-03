import type { NumberProperty } from "@akasha/pages-system/number-property"

export type SpeedMps = number

export const speedMps = {
  id: "01a06935-68b5-7fcb-aea6-a3c534c1c03b",
  pageTypeSlug: "number-property",
  slug: "speed-mps",
  propertySlug: "speed-mps",
  definition: "how fast the device was moving, in metres a second",
  max: null,
} as const satisfies NumberProperty
