import type { Slug } from "../../page/properties/slug.page-property-type.ts"
import type { PagePropertyType } from "../page-property-type.page-type.ts"

export type NameFormatSlug = Slug

export const nameFormatSlug = {
  id: "01a049b9-856c-73f0-bea2-c3036209aa09",
  pageTypeSlug: "page-property-type",
  slug: "name-format-slug",
  definition: "the format a text value is written in",
  extendsSlug: "page-property-type/page-property",
  kind: "relation",
  targetPageTypeSlug: "page-type/domain",
} as const satisfies PagePropertyType
