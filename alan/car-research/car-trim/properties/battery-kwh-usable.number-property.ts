import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const batteryKwhUsable = {
  id: "01a0c545-4862-70c7-92e5-5186171592d2",
  type: "page-type/number-property",
  slug: "battery-kwh-usable",
  propertySlug: "battery-kwh-usable",
  definition: "how much of the traction battery's energy the car uses, in kilowatt hours",
  max: null,
  types: "ts",
  createdAt: "2026-09-21T18:40:47.202Z",
  updatedAt: "2026-09-21T18:42:37.000Z",
} as const satisfies NumberProperty
