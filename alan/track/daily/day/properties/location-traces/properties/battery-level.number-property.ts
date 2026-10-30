import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const batteryLevel = {
  id: "01a06935-68b3-75ae-9b71-1b4d0d344683",
  type: "page-type/number-property",
  slug: "battery-level",
  propertySlug: "battery-level",
  definition: "how full a device's battery is",
  max: null,
  types: "ts",
  createdAt: "2026-09-03T21:38:23.027Z",
  updatedAt: "2026-10-30T16:45:54.226Z",
} as const satisfies NumberProperty
