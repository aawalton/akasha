import type { List } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { PageSlug } from "./page-slug.page-property-type.ts"

export type ConditionalReadingSlugs = List<PageSlug>

export const conditionalReadingSlugs = {
  id: "01a04a10-319c-7001-82f9-688f289cb246",
  pageTypeSlug: "page-property-type",
  slug: "conditional-reading-slugs",
  definition: "the pages that must be read once the agent judges them relevant",
  extendsSlug: null,
  kind: "list",
  entrySlug: "page-slug",
  max: null,
} as const satisfies PagePropertyType
