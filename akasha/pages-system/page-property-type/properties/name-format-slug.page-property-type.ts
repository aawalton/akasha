import type { PagePropertyType } from "../page-property-type.page-type.ts"
import type { Slug } from "../../page/properties/slug.page-property-type.ts"

export type NameFormatSlug = Slug

export const nameFormatSlug = {
  id: "01a049b9-856c-73f0-bea2-c3036209aa09",
  slug: "name-format-slug",
  definition: "the format a text value is written in",
  extendsSlug: "slug",
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType
