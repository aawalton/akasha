import type { PagePropertyType } from "../../page-property-type/page-property-type.page-type.ts"

export type Id = string

export const id = {
  id: "01a049b9-856c-7ee7-b958-f63eead00582",
  pageTypeSlug: "page-property-type",
  slug: "id",
  definition: "the identity a page keeps for its whole life",
  extendsSlug: null,
  type: "text",
  max: 36,
  nameFormatSlug: null,
} as const satisfies PagePropertyType
