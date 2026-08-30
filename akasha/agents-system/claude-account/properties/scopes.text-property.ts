import type { List } from "../../../pages-system/page-property/page-property.page-type.ts"
import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

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
      statement: "A scope is written as the grant spells it.",
    },
    {
      invariantKind: "departure",
      statement: "The scopes stand in the order the grant returned.",
    },
  ],
} as const satisfies TextProperty
