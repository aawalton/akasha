import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const rankOfAttunement = {
  id: "01a0ca70-c7ba-7853-ae2e-96054e6b7bc9",
  type: "page-type/relation-property",
  slug: "rank-of-attunement",
  propertySlug: "rank",
  definition: "the rung an attunement is on",
  targetPageType: "page-type/attunement-rank",
  types: "ts",
} as const satisfies RelationProperty
