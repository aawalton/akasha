import type { NumberProperty } from "@akasha/pages-system/number-property"

export type TickInterval = number

export const tickInterval = {
  id: "01a06193-6ca8-7471-9460-6a7a73360a6e",
  pageTypeSlug: "number-property",
  slug: "tick-interval",
  propertySlug: "tick-interval",
  definition: "how many seconds fall between one tick of an effect and the next",
  max: null,
} as const satisfies NumberProperty
