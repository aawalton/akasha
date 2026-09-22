import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const repeats = {
  id: "01a093fd-5112-7f98-883b-01d434b2b228",
  type: "page-type/boolean-property",
  slug: "repeats",
  propertySlug: "repeats",
  definition: "whether a call says an argument more than once",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry stating nothing here says its argument once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A repeating argument gathers its values in the order the values are said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An argument that does not repeat is refused where one call says it twice.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
