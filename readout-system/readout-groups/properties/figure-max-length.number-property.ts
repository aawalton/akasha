import type { NumberProperty } from "@akasha/pages-system/number-property"

export type FigureMaxLength = number

export const figureMaxLength = {
  id: "01a06559-e74c-7c06-a211-78febf717f43",
  pageTypeSlug: "number-property",
  slug: "figure-max-length",
  propertySlug: "figure-max-length",
  definition: "the most characters any figure in a group is written in",
  max: null,
} as const satisfies NumberProperty
