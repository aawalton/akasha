import type { TextProperty } from "../../text-properties/text-property.page-type.types.ts"
import type { List } from "../../types/page-properties/page-property.page-type.ts"

export type Key = string
export type Keys = List<Key>

export const keys = {
  id: "01a063ee-2a3b-7bb5-9481-1436d9b4ffb8",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "keys",
  propertySlug: "keys",
  definition: "the keys a query answers with, in the order it answers them",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A query naming no keys answers each page with every key that page has.",
    },
    {
      invariantKind: "departure",
      statement: "A key is spelled as the page with the key spells the key.",
    },
  ],
} as const satisfies TextProperty
