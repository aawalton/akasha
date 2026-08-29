import type { Slug } from "../../page/properties/slug.page-property-type.ts"
import type { PagePropertyType } from "../page-property-type.page-type.ts"

export type TargetPageTypeSlug = Slug

export const targetPageTypeSlug = {
  id: "01a04a08-fcf3-7001-9f43-3bfdc57c3676",
  pageTypeSlug: "page-property-type",
  slug: "target-page-type-slug",
  definition: "the page type this relation's value names, or a page type extending it",
  extendsSlug: null,
  kind: "relation",
  targetPageTypeSlug: "page-type/page-type",
} as const satisfies PagePropertyType
