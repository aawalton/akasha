import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../../../collection-system/collection-externals/collection-external.page-type.ts"
import type { Title } from "../../../../temper/temper-things/properties/title.text-property.ts"

export type Author = CollectionExternal & {
  title: Title
}

export const author = {
  id: "01a06807-be66-7000-b600-748274bb5ac8",
  pageTypeSlug: "page-type",
  slug: "author",
  definition: "one who wrote what Alan reads",
  pluralSlug: "authors",
  extendsSlug: "page-type/collection-external",
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
} as const satisfies PageType
