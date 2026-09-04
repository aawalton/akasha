import type { PageType } from "@akasha/pages-system/page-type"
import type { Collection } from "../../../../collection-system/collections/collection.page-type.ts"
import type { Title } from "../../../../pages/pages/properties/title.text-property.ts"

export type ArtistCollection = Collection & {
  title: Title
}

export const artistCollection = {
  id: "01a06807-be66-7007-94ba-493909f3dc58",
  pageTypeSlug: "page-type",
  slug: "artist-collection",
  definition: "a shelf of artists Alan keeps together",
  pluralSlug: "artist-collections",
  extendsSlug: "page-type/collection",
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
} as const satisfies PageType
