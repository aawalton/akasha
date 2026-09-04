import type { PageType } from "@akasha/pages-system/page-type"
import type { Collection } from "../../../../collection-system/collections/collection.page-type.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"

export type FandomCollection = Collection & {
  title: Title
}

export const fandomCollection = {
  id: "01a06807-be66-7005-98c4-ddf6b3a89ca2",
  pageTypeSlug: "page-type",
  slug: "fandom-collection",
  definition: "a shelf of fandoms Alan keeps together",
  pluralSlug: "fandom-collections",
  extendsSlug: ["page-type/collection"],
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
} as const satisfies PageType
