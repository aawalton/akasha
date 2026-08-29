import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Value } from "../../../pages-system/page-type/every-page-type.module.code.ts"

export type PageSlug = Value<"page">

export const pageSlug = {
  id: "01a04a08-fcf3-7004-af8a-1200dcbd314b",
  pageTypeSlug: "page-property-type",
  slug: "page-slug",
  definition: "a slug naming a page",
  extendsSlug: null,
  kind: "relation",
  targetPageTypeSlug: "page",
} as const satisfies PagePropertyType
