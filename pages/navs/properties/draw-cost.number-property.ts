import type { NumberProperty } from "@akasha/pages-system/number-property"

export type DrawCost = number

export const drawCost = {
  id: "01a0680e-5e00-7005-b136-3a8c5d2f5106",
  pageTypeSlug: "number-property",
  slug: "draw-cost",
  propertySlug: "draw-cost",
  definition: "what a person spends to open a nav item",
  max: null,
} as const satisfies NumberProperty
