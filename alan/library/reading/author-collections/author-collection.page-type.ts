import type { PageType } from "@akasha/pages-system/page-type"
import type { Collection } from "../../../../collection-system/collections/collection.page-type.ts"
import type { Title } from "../../../../pages/pages/properties/title.text-property.ts"

export type AuthorCollection = Collection & {
  title: Title
}

export const authorCollection = {
  id: "01a06807-be66-7001-8727-30e55aa5e73b",
  pageTypeSlug: "page-type",
  slug: "author-collection",
  definition: "a shelf of authors Alan keeps together",
  pluralSlug: "author-collections",
  extendsSlug: "page-type/collection",
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
} as const satisfies PageType
