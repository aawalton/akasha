import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type RelationshipDepositValueSlug = Slug

export const relationshipDepositValueSlug = {
  id: "01a0658d-16bc-7b66-83ce-cae8c84b28f2",
  pageTypeSlug: "relation-property",
  slug: "relationship-deposit-value-slug",
  propertySlug: "relationship-deposit-value-slug",
  definition: "the value it served",
  targetPageTypeSlug: "page-type/value",
} as const satisfies RelationProperty
