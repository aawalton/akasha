import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const temporary = {
  id: "01a08be4-8304-781b-9ab3-9259cf4cdafd",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "temporary",
  propertySlug: "temporary",
  definition: "whether what a change writes is meant to be taken away again",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change saying nothing here writes what is meant to stay.",
    },
    {
      invariantKind: "departure",
      statement: "What a temporary change writes answers to no page of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Whoever writes it takes it away again.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
