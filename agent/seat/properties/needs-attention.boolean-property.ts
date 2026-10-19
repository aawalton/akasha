import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const needsAttention = {
  id: "01a0defb-9e02-71e2-bec0-8ecc602875c6",
  type: "page-type/boolean-property",
  slug: "needs-attention",
  propertySlug: "needs-attention",
  definition: "whether a seat needs Alan",
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
  createdAt: "2026-09-26T18:30:27.074Z",
  updatedAt: "2026-10-19T17:58:10.181Z",
} as const satisfies BooleanProperty
