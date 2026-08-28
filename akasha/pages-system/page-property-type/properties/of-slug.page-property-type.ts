import type { PagePropertyType } from "../page-property-type.page-type.ts"
import type { Slug } from "../../page/properties/slug.page-property-type.ts"

export type OfSlug = Slug

export const ofSlug = {
  id: "01a04a08-fcf3-7002-9fe1-8bba60a8d78d",
  slug: "of-slug",
  definition: "the property type a list's entries are",
  extendsSlug: null,
  type: "relation",
  targetPageTypeSlug: "page-property-type",
} as const satisfies PagePropertyType
