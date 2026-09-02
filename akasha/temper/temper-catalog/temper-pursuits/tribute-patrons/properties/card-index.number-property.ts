import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CardIndex = number

export const cardIndex = {
  id: "01a06153-0ea9-7004-9ff4-611a43f3feff",
  pageTypeSlug: "number-property",
  slug: "card-index",
  propertySlug: "card-index",
  definition: "where a card falls in the deck a patron hands out",
  max: null,
} as const satisfies NumberProperty
