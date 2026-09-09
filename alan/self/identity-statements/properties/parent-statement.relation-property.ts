import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type ParentStatement = Slug

export const parentStatement = {
  id: "01a0658a-739f-7ef0-8539-77171f82a139",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "parent-statement",
  propertySlug: "parent-statement",
  definition: "the statement this one sits under",
  targetPageType: "page-type/identity-statement",
} as const satisfies RelationProperty
