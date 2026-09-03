import type { NumberProperty } from "@akasha/pages-system/number-property"

export type SeatIndex = number

export const seatIndex = {
  id: "01a06596-f0d5-7004-99d9-c7462575a139",
  pageTypeSlug: "number-property",
  slug: "seat-index",
  propertySlug: "seat-index",
  definition: "where a card sits among the cards a player has out",
  max: null,
} as const satisfies NumberProperty
