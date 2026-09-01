import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type Scope = string
export type Scopes = List<Scope>

export const scopes = {
  id: "01a054d8-1d39-7232-855e-3f83e6fed615",
  pageTypeSlug: "text-property",
  slug: "scopes",
  propertySlug: "scopes",
  definition: "one permission the account's token was granted",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A scope is written as the grant spells the scope.",
    },
    {
      invariantKind: "departure",
      statement: "The scopes stand in the order the grant returned.",
    },
  ],
} as const satisfies TextProperty
