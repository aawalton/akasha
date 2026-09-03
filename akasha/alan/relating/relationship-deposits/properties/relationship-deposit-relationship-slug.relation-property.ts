import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type RelationshipDepositRelationshipSlug = Slug

export const relationshipDepositRelationshipSlug = {
  id: "01a0658d-16bc-7f4b-9f6a-084d08b2ce0b",
  pageTypeSlug: "relation-property",
  slug: "relationship-deposit-relationship-slug",
  propertySlug: "relationship-deposit-relationship-slug",
  definition: "the person it was put into",
  targetPageTypeSlug: "page-type/relationship",
} as const satisfies RelationProperty
