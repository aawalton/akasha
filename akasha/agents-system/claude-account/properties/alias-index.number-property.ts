import type { NumberProperty } from "../../../pages-system/number-property/number-property.page-type.ts"

export type AliasIndex = number

export const aliasIndex = {
  id: "01a054d8-1d39-7b15-a48d-62c2122c274b",
  pageTypeSlug: "number-property",
  slug: "alias-index",
  propertySlug: "alias-index",
  definition: "the number in the shell alias that opens Claude on this account",
  max: null,
  unique: "page-type",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The alias `c3` opens the account carrying three.",
    },
    {
      invariantKind: "departure",
      statement: "An index freed by a departing account is not handed to another.",
    },
  ],
} as const satisfies NumberProperty
