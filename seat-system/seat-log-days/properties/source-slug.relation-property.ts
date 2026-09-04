import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type SourceSlug = Slug

export const sourceSlug = {
  id: "01a0657c-cb14-750f-8488-9fcedbe02a80",
  pageTypeSlug: "relation-property",
  slug: "source-slug",
  propertySlug: "source-slug",
  definition: "the stream a day of lines was written by",
  targetPageTypeSlug: "page-type/log-source",
} as const satisfies RelationProperty
