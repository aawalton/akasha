import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type Warrant = string

export const warrant = {
  id: "01a049c9-3a2c-73fb-98e4-6576fd3968b4",
  pageTypeSlug: "page-property-type",
  slug: "warrant",
  definition: "the general fact an act follows from",
  extendsSlug: "page-property-type/page-property",
  kind: "text",
  max: 100,
  nameFormatSlug: null,
} as const satisfies PagePropertyType
