import type { PagePropertyType } from "../../page-property-type/page-property-type.page-type.ts"
import type { Slug } from "../../page/properties/slug.page-property-type.ts"

export type ExtendsSlug = Slug

export const extendsSlug = {
  id: "01a049b9-856c-78f3-ac14-e3f86c75d104",
  slug: "extends-slug",
  definition: "the type a type takes its properties from",
  extendsSlug: "slug",
  nameFormatSlug: null,
  max: null,
} as const satisfies PagePropertyType
