import type { CollectionExternal } from "../../../../collections/externals/collection-external.page-type.types.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { ArtistGenre } from "./properties/artist-genre.text-property.ts"
import type { Reaction } from "./properties/reaction.file-property.ts"

export type Artist = CollectionExternal & {
  title: Title
  genre?: ArtistGenre
  reaction?: Reaction
}
