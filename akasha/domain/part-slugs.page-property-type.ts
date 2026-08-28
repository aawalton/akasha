import type { PagePropertyType } from "../page/page-property-type.page-type.ts"
import type { Slug } from "../page/slug.page-property-type.ts"

export type PartSlugs = readonly Slug[]

export const partSlugs = {
  id: "01a049cb-c488-7b90-ba0a-f6463fcda254",
  slug: "part-slugs",
  definition: "the domains this one is made of, in the order they are read",
  extendsSlug: null,
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType
