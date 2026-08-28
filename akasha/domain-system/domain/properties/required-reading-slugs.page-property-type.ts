import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Slug } from "../../../pages-system/page/properties/slug.page-property-type.ts"

export type RequiredReadingSlugs = readonly Slug[]

export const requiredReadingSlugs = {
  id: "01a049c8-3ead-73b9-a54b-16fbd26d59bf",
  slug: "required-reading-slugs",
  definition: "the pages that must be read before an act is allowed",
  extendsSlug: null,
  nameFormatSlug: null,
  max: null,
  design: [
    "A domain may name one below it in the tree.",
    "A domain's required reading names only the terms a reader would misread it without.",
  ],
} as const satisfies PagePropertyType
