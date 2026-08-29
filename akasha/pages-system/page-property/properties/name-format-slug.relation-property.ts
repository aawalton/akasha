import type { Slug } from "../../page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../relation-property/relation-property.page-type.ts"

export type NameFormatSlug = Slug

export const nameFormatSlug = {
  id: "01a049b9-856c-73f0-bea2-c3036209aa09",
  pageTypeSlug: "relation-property",
  slug: "name-format-slug",
  definition: "the format a text value is written in",
  targetPageTypeSlug: "page-type/name-format",
} as const satisfies RelationProperty
