import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const transactionCategory = {
  id: "01a0680b-2b00-700b-b148-5a2c9e7d210c",
  type: "page-type/relation-property",
  slug: "transaction-category",
  propertySlug: "category",
  definition: "the Monarch category of a transaction",
  targetPageType: "page-type/monarch-category",
  types: "ts",
  createdAt: "2026-09-03T16:12:37.504Z",
  updatedAt: "2026-10-30T15:47:07.511Z",
} as const satisfies RelationProperty
