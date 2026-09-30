import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const purseCurrency = {
  id: "01a0f1da-0622-7f28-8b3f-115df94a9eeb",
  type: "page-type/relation-property",
  slug: "purse-currency",
  propertySlug: "currency",
  definition: "the currency a purse is counted in",
  targetPageType: "page-type/world-currency",
  types: "ts",
} as const satisfies RelationProperty
