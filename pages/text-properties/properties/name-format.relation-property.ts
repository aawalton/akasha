import type { Slug } from "../../properties/slug.text-property.ts"
import type { RelationProperty } from "../../relation-properties/relation-property.page-type.ts"

export type NameFormat = Slug

export const nameFormat = {
  id: "01a049b9-856c-73f0-bea2-c3036209aa09",
  pageTypeSlug: "relation-property",
  slug: "name-format",
  propertySlug: "name-format",
  definition: "the format a text value is written in",
  targetPageType: "page-type/name-format",
} as const satisfies RelationProperty
