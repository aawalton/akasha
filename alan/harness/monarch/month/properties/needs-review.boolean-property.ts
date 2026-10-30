import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const needsReview = {
  id: "01a0680b-2b00-700f-b721-6d1f5c8a2110",
  type: "page-type/boolean-property",
  slug: "needs-review",
  propertySlug: "needs-review",
  definition: "whether Monarch asks a person to look at a Monarch transaction",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry stating nothing here states the opposite.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:12:37.504Z",
  updatedAt: "2026-10-30T15:46:58.120Z",
} as const satisfies BooleanProperty
