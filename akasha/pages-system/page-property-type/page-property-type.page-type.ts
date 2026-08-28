import type { Max } from "./properties/max.page-property-type.ts"
import type { NameFormatSlug } from "./properties/name-format-slug.page-property-type.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"

export type PagePropertyType = PageType & {
  nameFormatSlug: NameFormatSlug | null
  max: Max | null
}

export const pagePropertyType = {
  id: "01a049ae-fe2c-7255-b9eb-cc89c834fc2a",
  slug: "page-property-type",
  definition: "the shape of one value a page carries",
  extendsSlug: "page-type",
} as const satisfies PageType
