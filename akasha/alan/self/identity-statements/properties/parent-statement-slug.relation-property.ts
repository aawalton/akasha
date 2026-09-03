import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ParentStatementSlug = Slug

export const parentStatementSlug = {
  id: "01a06589-d12a-749b-b682-a01a7264421d",
  pageTypeSlug: "relation-property",
  slug: "parent-statement-slug",
  propertySlug: "parent-statement-slug",
  definition: "the statement this one sits under",
  targetPageTypeSlug: "page-type/identity-statement",
} as const satisfies RelationProperty
