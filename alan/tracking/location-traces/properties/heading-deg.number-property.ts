import type { NumberProperty } from "@akasha/pages-system/number-property"

export type HeadingDeg = number

export const headingDeg = {
  id: "01a06935-68b4-7370-a96d-a05e0ee03b6d",
  pageTypeSlug: "number-property",
  slug: "heading-deg",
  propertySlug: "heading-deg",
  definition: "which way the device was moving, in degrees clockwise from north",
  max: null,
} as const satisfies NumberProperty
