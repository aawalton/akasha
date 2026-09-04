import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../../../collection-system/collection-externals/collection-external.page-type.ts"
import type { Title } from "../../../../pages/pages/properties/title.text-property.ts"

export type BookCollection = CollectionExternal & {
  title: Title
}

export const bookCollection = {
  id: "01a06807-be66-7002-8260-b13166dc16e1",
  pageTypeSlug: "page-type",
  slug: "book-collection",
  definition: "a shelf of books Alan keeps together",
  pluralSlug: "book-collections",
  extendsSlug: "page-type/collection-external",
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
} as const satisfies PageType
