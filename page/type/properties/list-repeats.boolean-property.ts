import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const listRepeats = {
  id: "01a0c612-d86d-7c56-8264-84dffa72b070",
  type: "page-type/boolean-property",
  slug: "list-repeats",
  propertySlug: "repeats",
  definition: "whether a value is written more than once in this property's list",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A list carries each value once unless its declaration says otherwise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list whose order is the meaning is the list that repeats a value.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
