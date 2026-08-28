import type { PagePropertyType } from "./page-property-type.page-type.ts"

export type Slug = string

export const slug = {
  id: "01a049b9-856c-7187-96e0-518b0a8c72cb",
  slug: "slug",
  definition: "the name a page is reached by",
  extendsSlug: null,
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType
