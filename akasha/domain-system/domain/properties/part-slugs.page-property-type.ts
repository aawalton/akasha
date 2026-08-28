import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Slug } from "../../../pages-system/page/properties/slug.page-property-type.ts"

export type PartSlugs = readonly Slug[]

export const partSlugs = {
  id: "01a049cb-c488-7b90-ba0a-f6463fcda254",
  slug: "part-slugs",
  definition: "the domains this one is made of, in the order they are read",
  extendsSlug: null,
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType
