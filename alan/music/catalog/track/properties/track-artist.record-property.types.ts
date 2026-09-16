import type { ExternalId } from "akasha/alan/collection/external/properties/external-id.text-property.types.ts"
import type { ArtistName } from "akasha/alan/music/listening/heard-music/properties/tracks/properties/artist-name.text-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type TrackArtist = List<{
  externalId?: ExternalId
  artistName?: ArtistName
}>
