import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const rejected = {
  id: "01a0a69a-f9ee-7fdd-bb05-acc599a0cd9f",
  type: "page-type/boolean-property",
  slug: "rejected",
  propertySlug: "rejected",
  definition: "whether the answer came back no",
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
} as const satisfies BooleanProperty
