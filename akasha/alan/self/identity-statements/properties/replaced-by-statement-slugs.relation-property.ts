import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ReplacedByStatementSlugs = Slug

export const replacedByStatementSlugs = {
  id: "01a0658a-739f-7a30-b80e-84746389acf7",
  pageTypeSlug: "relation-property",
  slug: "replaced-by-statement-slugs",
  propertySlug: "replaced-by-statement-slugs",
  definition: "the statements superseding this one",
  targetPageTypeSlug: "page-type/identity-statement",
} as const satisfies RelationProperty
