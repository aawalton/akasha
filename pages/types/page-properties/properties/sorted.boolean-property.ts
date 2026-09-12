import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const sorted = {
  id: "01a0958e-49df-77de-8741-a211bb75d609",
  type: "boolean-property",
  slug: "sorted",
  propertySlug: "sorted",
  definition: "whether a property's values are kept in the order those values sort in",
  types: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property saying nothing here keeps its values in the order they were put in.",
    },
    {
      invariantKind: "departure",
      statement: "A property saying true here takes a value into the place that order asks for.",
    },
    {
      invariantKind: "departure",
      statement: "The order is the one the values sort in as they are written.",
    },
    {
      invariantKind: "departure",
      statement: "A property whose order carries meaning of its own says nothing here.",
    },
  ],
} as const satisfies BooleanProperty
