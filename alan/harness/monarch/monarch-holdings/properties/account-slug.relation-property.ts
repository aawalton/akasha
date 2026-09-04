import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type AccountSlug = Slug

export const accountSlug = {
  id: "01a0680a-1a00-7010-9e43-7f1d8a5b1110",
  pageTypeSlug: "relation-property",
  slug: "account-slug",
  propertySlug: "account-slug",
  definition: "the account a holding or a transaction stands under",
  targetPageTypeSlug: "page-type/monarch-account",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A holding stands under exactly one account.",
    },
  ],
} as const satisfies RelationProperty
