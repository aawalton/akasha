import type { CollectionExternal } from "akasha/alan/collections/externals/collection-external.page-type.types.ts"
import type { ArtistGenre } from "akasha/alan/music/catalog/artists/properties/artist-genre.text-property.types.ts"
import type { Reaction } from "akasha/alan/music/catalog/artists/properties/reaction.file-property.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type Artist = CollectionExternal & {
  title: Title
  genre?: ArtistGenre
  reaction?: Reaction
}
