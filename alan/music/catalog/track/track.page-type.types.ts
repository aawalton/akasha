import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { CarriedBy } from "akasha/alan/music/catalog/track/properties/carried-by.record-property.types.ts"
import type { Explicit } from "akasha/alan/music/catalog/track/properties/explicit.boolean-property.types.ts"
import type { Song } from "akasha/alan/music/catalog/track/properties/song.relation-property.types.ts"
import type { TrackArtist } from "akasha/alan/music/catalog/track/properties/track-artist.record-property.types.ts"
import type { TrackKey } from "akasha/alan/music/catalog/track/properties/track-key.text-property.types.ts"
import type { TrackType } from "akasha/alan/music/catalog/track/properties/track-type.select-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Track = Collection & {
  title: Title
  trackType?: TrackType
  explicit?: Explicit
  trackArtist?: TrackArtist
  trackKey?: TrackKey
  song?: Song
  carriedBy?: CarriedBy
}
