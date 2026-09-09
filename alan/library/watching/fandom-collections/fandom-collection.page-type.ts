import type { PageType } from "@akasha/pages/page-type"
import type { Collection } from "../../../../collections/collection.page-type.ts"
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
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
} as const satisfies PageType
