import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CaptureThroughLine = number

export const captureThroughLine = {
  id: "01a0659f-93da-7007-991f-18353cf657a0",
  pageTypeSlug: "number-property",
  slug: "capture-through-line",
  propertySlug: "capture-through-line",
  definition: "the line of a transcript a score was read through to",
  max: null,
} as const satisfies NumberProperty
