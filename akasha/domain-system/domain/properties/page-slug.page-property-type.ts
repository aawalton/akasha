import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Slug } from "../../../pages-system/page/properties/slug.page-property-type.ts"

export type PageSlug = Slug

export const pageSlug = {
  id: "01a04a08-fcf3-7004-af8a-1200dcbd314b",
  slug: "page-slug",
  definition: "a slug naming a page",
  extendsSlug: null,
  type: "relation",
  targetPageTypeSlug: "page",
} as const satisfies PagePropertyType
