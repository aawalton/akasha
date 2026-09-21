import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const dcFastChargePeakKw = {
  id: "01a0c545-9fc7-7d02-bb89-9c6633b5377e",
  type: "page-type/number-property",
  slug: "dc-fast-charge-peak-kw",
  propertySlug: "dc-fast-charge-peak-kw",
  definition: "the most a fast charger ever puts into the car at once, in kilowatts",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
