import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const pending = {
  id: "01a0680b-2b00-7010-8a46-3e9c7b2d2111",
  type: "page-type/boolean-property",
  slug: "pending",
  propertySlug: "pending",
  definition: "whether a transaction has yet to clear",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry stating nothing here states the opposite.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T16:12:37.504Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies BooleanProperty
