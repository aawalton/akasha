import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { List } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { PageSlug } from "./page-slug.page-property-type.ts"

export type RequiredReadingSlugs = List<PageSlug>

export const requiredReadingSlugs = {
  id: "01a049c8-3ead-73b9-a54b-16fbd26d59bf",
  pageTypeSlug: "page-property-type",
  slug: "required-reading-slugs",
  definition: "the pages that must be read before an act is allowed",
  extendsSlug: null,
  kind: "list",
  entrySlug: "page-slug",
  max: null,
  design: [
    "A domain may name one below it in the tree.",
    "A domain's required reading names only the terms a reader would misread it without.",
  ],
} as const satisfies PagePropertyType
