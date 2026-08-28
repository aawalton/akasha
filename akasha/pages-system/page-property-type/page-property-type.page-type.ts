import type { Max } from "./properties/max.page-property-type.ts"
import type { NameFormatSlug } from "./properties/name-format-slug.page-property-type.ts"
import type { OfSlug } from "./properties/of-slug.page-property-type.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"
import type { TargetPageTypeSlug } from "./properties/target-page-type-slug.page-property-type.ts"

export type List<T> = readonly T[]

export type PagePropertyType = PageType &
  (
    | { type: "text"; max: Max; nameFormatSlug: NameFormatSlug | null }
    | { type: "number"; max: Max | null }
    | { type: "relation"; targetPageTypeSlug: TargetPageTypeSlug }
    | { type: "record" }
    | { type: "list"; ofSlug: OfSlug; max: Max | null }
  )

export const pagePropertyType = {
  id: "01a049ae-fe2c-7255-b9eb-cc89c834fc2a",
  pageTypeSlug: "page-type",
  slug: "page-property-type",
  definition: "the shape of one value a page carries",
  extendsSlug: "page-type",
} as const satisfies PageType
