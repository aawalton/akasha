import type { NumberProperty } from "@akasha/pages-system/number-property"

export type BytePoints = number

export const bytePoints = {
  id: "01a06551-d6a6-7002-8d8a-e44a87773d07",
  pageTypeSlug: "number-property",
  slug: "byte-points",
  propertySlug: "byte-points",
  definition: "the bytes written on a day, scored as points",
  max: null,
} as const satisfies NumberProperty
