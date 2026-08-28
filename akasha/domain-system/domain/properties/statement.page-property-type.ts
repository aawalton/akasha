import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type Statement = string

export const statement = {
  id: "01a049c8-3ead-7c41-ae0b-d4c110afbc4f",
  pageTypeSlug: "page-property-type",
  slug: "statement",
  definition: "one sentence of a page's prose",
  extendsSlug: null,
  type: "text",
  max: 200,
  nameFormatSlug: null,
} as const satisfies PagePropertyType
