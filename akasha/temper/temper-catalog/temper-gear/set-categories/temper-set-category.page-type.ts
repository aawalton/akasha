import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"

export type TemperSetCategory = TemperCatalogThing

export const temperSetCategory = {
  id: "01a05fd1-d441-711d-bcc5-d8bf635f2b8f",
  pageTypeSlug: "page-type",
  slug: "temper-set-category",
  definition: "where a set is got from",
  pluralSlug: "temper-set-categories",
  extendsSlug: "page-type/temper-catalog-thing",
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
  ],
} as const satisfies PageType
