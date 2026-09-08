import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type ReachedSlug = Slug

export const reachedSlug = {
  id: "01a0815e-e797-751f-b5bb-08f554394d1a",
  pageTypeSlug: "relation-property",
  slug: "reached-slug",
  propertySlug: "reached-slug",
  definition: "the page type whose changes a runner reaches",
  targetPageTypeSlug: "page-type/page-type",
} as const satisfies RelationProperty
