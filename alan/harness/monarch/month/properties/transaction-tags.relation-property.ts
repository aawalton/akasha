import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const transactionTags = {
  id: "01a0680b-2b00-700c-8d95-4f6a1b3c210d",
  type: "page-type/relation-property",
  slug: "transaction-tags",
  propertySlug: "tags",
  definition: "the Monarch tags on a Monarch transaction",
  targetPageType: "page-type/monarch-tag",
  types: "ts",
  createdAt: "2026-09-03T16:12:37.504Z",
  updatedAt: "2026-10-30T15:44:33.085Z",
} as const satisfies RelationProperty
