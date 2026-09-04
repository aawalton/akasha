import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ReplacesStatementSlugs = Slug

export const replacesStatementSlugs = {
  id: "01a0658a-739f-799b-8d3d-ce0fdec966a9",
  pageTypeSlug: "relation-property",
  slug: "replaces-statement-slugs",
  propertySlug: "replaces-statement-slugs",
  definition: "the statements this one supersedes",
  targetPageTypeSlug: "page-type/identity-statement",
} as const satisfies RelationProperty
