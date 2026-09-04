import type { TextProperty } from "../../text-properties/text-property.page-type.ts"
import type { List } from "../../types/page-properties/page-property.page-type.ts"

export type Key = string
export type Keys = List<Key>

export const keys = {
  id: "01a063ee-2a3b-7bb5-9481-1436d9b4ffb8",
  pageTypeSlug: "text-property",
  slug: "keys",
  propertySlug: "keys",
  definition: "the keys a query answers with, in the order it answers them",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A query naming no keys answers with every key its page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A key is spelled as the page carrying the key spells the key.",
    },
  ],
} as const satisfies TextProperty
