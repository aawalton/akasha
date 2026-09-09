import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type LogSource = Slug

export const logSource = {
  id: "01a0657c-cb14-750f-8488-9fcedbe02a80",
  pageTypeSlug: "relation-property",
  slug: "log-source",
  propertySlug: "source",
  definition: "the stream a day of lines was written by",
  targetPageType: "page-type/log-source",
} as const satisfies RelationProperty
