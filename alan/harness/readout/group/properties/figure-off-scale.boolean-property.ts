import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const figureOffScale = {
  id: "01a06559-e74c-7248-9e76-67d17dce9bc4",
  type: "page-type/boolean-property",
  slug: "figure-off-scale",
  propertySlug: "figure-off-scale",
  definition: "whether a readout in a group shows its number outside its readout scale",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A group stating nothing draws no number past either end of its scale.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading has no number to draw past either end of its scale where the group states false.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading between two rungs draws its number whatever the group states.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T03:39:45.868Z",
  updatedAt: "2026-10-30T16:23:27.549Z",
} as const satisfies BooleanProperty
