import type { PageType } from "../page-type/page-type.page-type.ts"
import type { EntrySlug } from "./properties/entry-slug.page-property-type.ts"
import type { Max } from "./properties/max.page-property-type.ts"
import type { NameFormatSlug } from "./properties/name-format-slug.page-property-type.ts"
import type { TargetPageTypeSlug } from "./properties/target-page-type-slug.page-property-type.ts"

export type List<T> = readonly T[]

export type PagePropertyType = PageType &
  (
    | { kind: "text"; max: Max; nameFormatSlug: NameFormatSlug | null }
    | { kind: "number"; max: Max | null }
    | { kind: "relation"; targetPageTypeSlug: TargetPageTypeSlug }
    | { kind: "record" }
    | { kind: "file" }
    | { kind: "list"; entrySlug: EntrySlug; max: Max | null }
  )

export const pagePropertyType = {
  id: "01a049ae-fe2c-7255-b9eb-cc89c834fc2a",
  pageTypeSlug: "page-type",
  slug: "page-property-type",
  definition: "the shape of one value a page carries",
  extendsSlug: "page-type/page-type",
} as const satisfies PageType
