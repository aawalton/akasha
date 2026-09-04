import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../../../collection-system/collection-externals/collection-external.page-type.ts"
import type { Title } from "../../../../pages/pages/properties/title.text-property.ts"
import type { ArtistGenre } from "./properties/artist-genre.text-property.ts"
import type { Reaction } from "./properties/reaction.file-property.ts"

export type Artist = CollectionExternal & {
  title: Title
  genre?: readonly ArtistGenre[]
  reaction?: Reaction
}

export const artist = {
  id: "01a06243-144b-7013-99b2-e1b52805e43b",
  pageTypeSlug: "page-type",
  slug: "artist",
  definition: "a musician whose work Alan keeps",
  pluralSlug: "artists",
  extendsSlug: "page-type/collection-external",
  partSlugs: ["file-property/reaction", "text-property/artist-genre"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "artist-genre", required: false, many: true, max: null },
    { pagePropertySlug: "reaction", required: false, many: false },
  ],
} as const satisfies PageType
