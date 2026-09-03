import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type FigureOffScale = boolean

export const figureOffScale = {
  id: "01a06559-e74c-7248-9e76-67d17dce9bc4",
  pageTypeSlug: "boolean-property",
  slug: "figure-off-scale",
  propertySlug: "figure-off-scale",
  definition: "whether a reading past either end of its scale still draws its number",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A readout stating nothing draws no number past either end of its scale.",
    },
  ],
} as const satisfies BooleanProperty
