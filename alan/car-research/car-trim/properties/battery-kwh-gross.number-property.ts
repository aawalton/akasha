import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const batteryKwhGross = {
  id: "01a0c545-1d30-73d9-b19f-ba32a28323af",
  type: "page-type/number-property",
  slug: "battery-kwh-gross",
  propertySlug: "battery-kwh-gross",
  definition: "how much energy the traction battery holds in all, in kilowatt hours",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
