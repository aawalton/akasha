import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CardRank = number

export const cardRank = {
  id: "01a06596-f0d5-7002-bf2f-b274f9c2f5fe",
  pageTypeSlug: "number-property",
  slug: "card-rank",
  propertySlug: "rank",
  definition: "how far a card has been ranked up",
  max: null,
} as const satisfies NumberProperty
