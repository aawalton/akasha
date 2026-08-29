import type { Slug } from "../../page/properties/slug.page-property-type.ts"
import type { PagePropertyType } from "../../page-property-type/page-property-type.page-type.ts"

export type PagePropertyTypeSlug = Slug

export const pagePropertyTypeSlug = {
  id: "01a04df3-6847-78ba-a32d-216da05c58ee",
  pageTypeSlug: "page-property-type",
  slug: "page-property-type-slug",
  definition: "a slug naming a page property type",
  extendsSlug: "page-property-type/page-property",
  kind: "relation",
  targetPageTypeSlug: "page-type/page-property-type",
} as const satisfies PagePropertyType
