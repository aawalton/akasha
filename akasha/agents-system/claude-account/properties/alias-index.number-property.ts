import type { NumberProperty } from "@akasha/pages-system/number-property"

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
      statement: "The alias `c3` opens the account carrying the alias index 3.",
    },
    {
      invariantKind: "departure",
      statement: "An index freed by a departing account is not handed to another account.",
    },
  ],
} as const satisfies NumberProperty
