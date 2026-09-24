import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const askedByName = {
  id: "01a0d446-e3b6-7c3d-94bb-58191a8fbe8f",
  type: "page-type/boolean-property",
  slug: "asked-by-name",
  propertySlug: "asked-by-name",
  definition: "whether a calculation is worked out only for a question naming its key",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A computed property asked by name is left out of every answer to a question not naming it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing leaves such a property out unless the listing carries it by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property stating nothing here is answered as every other key is.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
