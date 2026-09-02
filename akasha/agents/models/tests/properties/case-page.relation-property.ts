import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type CasePage = Slug

export const casePage = {
  id: "01a05f8d-eaa0-7000-8c49-cf81f87d38a4",
  pageTypeSlug: "relation-property",
  slug: "case-page",
  propertySlug: "page",
  definition: "the page a case is drawn from",
  targetPageTypeSlug: "page-type/page",
} as const satisfies RelationProperty
