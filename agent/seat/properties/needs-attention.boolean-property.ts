import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const needsAttention = {
  id: "01a0defb-9e02-71e2-bec0-8ecc602875c6",
  type: "page-type/boolean-property",
  slug: "needs-attention",
  propertySlug: "needs-attention",
  definition: "whether the last turn in a seat asked Alan for something",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn ending states this, and a prompt arriving clears it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat never stated this reads as not needing attention.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
