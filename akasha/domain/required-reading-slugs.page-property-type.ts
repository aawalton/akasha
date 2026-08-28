import type { PagePropertyType } from "../page/page-property-type.page-type.ts"
import type { Slug } from "../page/slug.page-property-type.ts"

export type RequiredReadingSlugs = readonly Slug[]

export const requiredReadingSlugs = {
  id: "01a049c8-3ead-73b9-a54b-16fbd26d59bf",
  slug: "required-reading-slugs",
  definition: "the pages that must be read before an act is allowed",
  extendsSlug: null,
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType
