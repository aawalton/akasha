import type { List } from "@akasha/pages/page-property"
import type { TextProperty } from "@akasha/pages/text-property"

export type Scope = string
export type Scopes = List<Scope>

export const scopes = {
  id: "01a054d8-1d39-7232-855e-3f83e6fed615",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "scopes",
  propertySlug: "scopes",
  definition: "one permission the account's token was granted",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A scope is written as the grant spells the scope.",
    },
    {
      invariantKind: "departure",
      statement: "The scopes sit in the order the grant returned.",
    },
  ],
} as const satisfies TextProperty
