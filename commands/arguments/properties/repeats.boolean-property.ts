import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const repeats = {
  id: "01a093fd-5112-7f98-883b-01d434b2b228",
  type: "boolean-property",
  slug: "repeats",
  propertySlug: "repeats",
  definition: "whether one call says an argument more than once",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An argument stating nothing here is said once.",
    },
    {
      invariantKind: "departure",
      statement: "A repeating argument gathers its values in the order the values are said.",
    },
    {
      invariantKind: "departure",
      statement: "An argument that does not repeat is refused where one call says it twice.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
