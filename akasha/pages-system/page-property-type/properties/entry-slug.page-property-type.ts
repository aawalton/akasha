import type { PagePropertyType } from "../page-property-type.page-type.ts"
import type { Slug } from "../../page/properties/slug.page-property-type.ts"

export type EntrySlug = Slug

export const entrySlug = {
  id: "01a04a08-fcf3-7002-9fe1-8bba60a8d78d",
  pageTypeSlug: "page-property-type",
  slug: "entry-slug",
  definition: "the property type of a list's entries",
  extendsSlug: null,
  kind: "relation",
  targetPageTypeSlug: "page-property-type",
} as const satisfies PagePropertyType
