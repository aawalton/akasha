import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ValuePerPiece = number

export const valuePerPiece = {
  id: "01a05fe0-8428-7c08-a3df-30db8ae9ad6a",
  pageTypeSlug: "number-property",
  slug: "value-per-piece",
  propertySlug: "value-per-piece",
  definition: "what one piece of armor adds to the metric an effect moves",
  max: null,
} as const satisfies NumberProperty
