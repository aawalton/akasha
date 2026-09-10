import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type Reached = Slug

export const reached = {
  id: "01a0815e-e797-751f-b5bb-08f554394d1a",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "reached",
  propertySlug: "reached",
  definition: "the page type whose changes a runner reaches",
  targetPageType: "page-type/page-type",
} as const satisfies RelationProperty
