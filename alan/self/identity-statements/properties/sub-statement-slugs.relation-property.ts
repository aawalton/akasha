import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type SubStatementSlugs = Slug

export const subStatementSlugs = {
  id: "01a0658a-739f-7ad3-8836-aaf163131279",
  pageTypeSlug: "relation-property",
  slug: "sub-statement-slugs",
  propertySlug: "sub-statement-slugs",
  definition: "the statements sitting under this one",
  targetPageTypeSlug: "page-type/identity-statement",
} as const satisfies RelationProperty
