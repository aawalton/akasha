import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type Definition = string

export const definition = {
  id: "01a049b9-856c-70ca-bfd8-31cb76ead837",
  slug: "definition",
  definition: "the sentence naming what a page's subject is",
  extendsSlug: null,
  nameFormatSlug: null,
  max: 100,
} as const satisfies PagePropertyType
