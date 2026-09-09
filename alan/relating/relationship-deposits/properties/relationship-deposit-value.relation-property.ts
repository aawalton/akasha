import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type RelationshipDepositValue = Slug

export const relationshipDepositValue = {
  id: "01a0658d-16bc-7b66-83ce-cae8c84b28f2",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "relationship-deposit-value",
  propertySlug: "relationship-deposit-value",
  definition: "the value it served",
  targetPageType: "page-type/value",
} as const satisfies RelationProperty
