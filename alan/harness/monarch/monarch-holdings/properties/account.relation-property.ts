import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type Account = Slug

export const account = {
  id: "01a0680a-1a00-7010-9e43-7f1d8a5b1110",
  pageTypeSlug: "relation-property",
  slug: "account",
  propertySlug: "account",
  definition: "the account a holding or a transaction sits under",
  targetPageType: "page-type/monarch-account",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A holding sits under exactly one account.",
    },
  ],
} as const satisfies RelationProperty
