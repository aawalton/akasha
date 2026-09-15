import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const batteryLevel = {
  id: "01a06935-68b3-75ae-9b71-1b4d0d344683",
  type: "page-type/number-property",
  slug: "battery-level",
  propertySlug: "battery-level",
  definition: "how much charge the device held, as a fraction of full",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
