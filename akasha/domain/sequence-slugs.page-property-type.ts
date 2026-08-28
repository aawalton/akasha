import type { PagePropertyType } from "../page/page-property-type.page-type.ts"
import type { Slug } from "../page/slug.page-property-type.ts"

export type SequenceSlugs = readonly Slug[]

export const sequenceSlugs = {
  id: "01a049c8-3ead-7122-9b54-8305cfa37b98",
  slug: "sequence-slugs",
  definition: "the domains beneath this one, in the order they are read",
  extendsSlug: null,
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType
