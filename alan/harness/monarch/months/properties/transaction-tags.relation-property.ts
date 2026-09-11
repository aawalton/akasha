import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const transactionTags = {
  id: "01a0680b-2b00-700c-8d95-4f6a1b3c210d",
  type: "relation-property",
  slug: "transaction-tags",
  propertySlug: "tags",
  definition: "the labels applied to a transaction",
  targetPageType: "page-type/monarch-tag",
  types: "ts",
} as const satisfies RelationProperty
