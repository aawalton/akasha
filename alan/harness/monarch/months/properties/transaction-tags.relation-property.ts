import type { Slug } from "akasha/pages/properties/slug.text-property.ts"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type TransactionTags = List<Slug>

export const transactionTags = {
  id: "01a0680b-2b00-700c-8d95-4f6a1b3c210d",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "transaction-tags",
  propertySlug: "tags",
  definition: "the labels applied to a transaction",
  targetPageType: "page-type/monarch-tag",
} as const satisfies RelationProperty
