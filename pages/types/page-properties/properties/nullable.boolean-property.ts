import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const nullable = {
  id: "01a08d70-c263-7e18-b970-543a49a8397c",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "nullable",
  propertySlug: "nullable",
  definition: "whether a page may state nothing under this property rather than a value",
  types: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property saying nothing here holds a value wherever a page states it.",
    },
    {
      invariantKind: "departure",
      statement: "A property saying true here is written as its kind or nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Stating nothing and leaving the key out are two facts.",
    },
  ],
} as const satisfies BooleanProperty
