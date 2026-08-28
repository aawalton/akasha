import type { PagePropertyType } from "../../page-property-type/page-property-type.page-type.ts"
import type { Slug } from "./slug.page-property-type.ts"

export type PageTypeSlug = Slug

export const pageTypeSlug = {
  id: "01a04a10-319c-7000-a5f4-e048da231b65",
  pageTypeSlug: "page-property-type",
  slug: "page-type-slug",
  definition: "the page type a page is",
  extendsSlug: null,
  kind: "relation",
  targetPageTypeSlug: "page-type",
} as const satisfies PagePropertyType
