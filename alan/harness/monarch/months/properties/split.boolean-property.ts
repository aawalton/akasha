import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type Split = boolean

export const split = {
  id: "01a0680b-2b00-700d-a462-7c3e8d5f210e",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "split",
  propertySlug: "split",
  definition: "whether a transaction was broken into parts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An entry stating nothing here states the opposite.",
    },
  ],
} as const satisfies BooleanProperty
