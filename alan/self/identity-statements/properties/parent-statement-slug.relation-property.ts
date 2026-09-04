import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ParentStatementSlug = Slug

export const parentStatementSlug = {
  id: "01a0658a-739f-7ef0-8539-77171f82a139",
  pageTypeSlug: "relation-property",
  slug: "parent-statement-slug",
  propertySlug: "parent-statement-slug",
  definition: "the statement this one sits under",
  targetPageTypeSlug: "page-type/identity-statement",
} as const satisfies RelationProperty
