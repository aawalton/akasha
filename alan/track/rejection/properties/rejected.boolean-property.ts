import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const rejected = {
  id: "01a0a69a-f9ee-7fdd-bb05-acc599a0cd9f",
  type: "page-type/boolean-property",
  slug: "rejected",
  propertySlug: "rejected",
  definition: "whether Alan's request was rejected",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer still to come is not a no.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A yes and an answer still to come are written down the same way.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-15T19:46:09.518Z",
  updatedAt: "2026-10-30T16:42:23.337Z",
} as const satisfies BooleanProperty
