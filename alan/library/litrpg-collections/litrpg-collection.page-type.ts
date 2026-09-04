import type { PageType } from "@akasha/pages-system/page-type"
import type { Collection } from "../../../collection-system/collections/collection.page-type.ts"
import type { Title } from "../../../pages/pages/properties/title.text-property.ts"

export type LitrpgCollection = Collection & {
  title: Title
}

export const litrpgCollection = {
  id: "01a06807-be66-700a-962a-c99e0bc93be5",
  pageTypeSlug: "page-type",
  slug: "litrpg-collection",
  definition: "a shelf of litrpg stories Alan keeps together",
  pluralSlug: "litrpg-collections",
  extendsSlug: "page-type/collection",
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
} as const satisfies PageType
