import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const split = {
  id: "01a0680b-2b00-700d-a462-7c3e8d5f210e",
  type: "page-type/boolean-property",
  slug: "split",
  propertySlug: "split",
  definition: "whether a transaction was broken into parts",
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
