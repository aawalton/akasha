import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type NeedsReview = boolean

export const needsReview = {
  id: "01a0680b-2b00-700f-b721-6d1f5c8a2110",
  pageTypeSlug: "boolean-property",
  slug: "needs-review",
  propertySlug: "needs-review",
  definition: "whether a transaction is waiting for somebody to settle it",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An entry stating nothing here states the opposite.",
    },
  ],
} as const satisfies BooleanProperty
