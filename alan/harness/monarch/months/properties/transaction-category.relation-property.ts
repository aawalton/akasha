import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const transactionCategory = {
  id: "01a0680b-2b00-700b-b148-5a2c9e7d210c",
  type: "relation-property",
  slug: "transaction-category",
  propertySlug: "category",
  definition: "what a transaction counts as",
  targetPageType: "page-type/monarch-category",
  types: "ts",
} as const satisfies RelationProperty
