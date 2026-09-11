import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const altitudeM = {
  id: "01a06935-68b3-78dc-87ae-e65beefa66fa",
  type: "number-property",
  slug: "altitude-m",
  propertySlug: "altitude-m",
  definition: "how far above sea level the trace was taken, in metres",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
