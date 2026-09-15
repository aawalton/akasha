import type { CollectionExternal } from "akasha/alan/collection/external/collection-external.page-type.types.ts"
import type { ArtistGenre } from "akasha/alan/music/catalog/artist/properties/artist-genre.text-property.types.ts"
import type { Reaction } from "akasha/alan/music/catalog/artist/properties/reaction.file-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Artist = CollectionExternal & {
  title: Title
  genre?: ArtistGenre
  reaction?: Reaction
}
