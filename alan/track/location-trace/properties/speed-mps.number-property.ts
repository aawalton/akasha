import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const speedMps = {
  id: "01a06935-68b5-7fcb-aea6-a3c534c1c03b",
  type: "page-type/number-property",
  slug: "speed-mps",
  propertySlug: "speed-mps",
  definition: "how fast the device was moving, in metres a second",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
