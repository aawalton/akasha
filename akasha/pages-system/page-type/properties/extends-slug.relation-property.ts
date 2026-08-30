import type { Slug } from "../../page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../relation-property/relation-property.page-type.ts"

export type ExtendsSlug = Slug

export const extendsSlug = {
  id: "01a049b9-856c-78f3-ac14-e3f86c75d104",
  pageTypeSlug: "relation-property",
  slug: "extends-slug",
  propertySlug: "extends-slug",
  definition: "the type a type takes its properties from",
  targetPageTypeSlug: "page-type/page-type",
} as const satisfies RelationProperty
