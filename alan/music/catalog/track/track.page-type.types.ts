import type { CollectionExternal } from "akasha/alan/collection/external/collection-external.page-type.types.ts"
import type { DiscNumber } from "akasha/alan/music/catalog/track/properties/disc-number.number-property.types.ts"
import type { Explicit } from "akasha/alan/music/catalog/track/properties/explicit.boolean-property.types.ts"
import type { Song } from "akasha/alan/music/catalog/track/properties/song.relation-property.types.ts"
import type { TrackArtist } from "akasha/alan/music/catalog/track/properties/track-artist.record-property.types.ts"
import type { TrackKey } from "akasha/alan/music/catalog/track/properties/track-key.text-property.types.ts"
import type { TrackType } from "akasha/alan/music/catalog/track/properties/track-type.select-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type Track = CollectionExternal & {
  title: Title
  trackType?: TrackType
  discNumber?: DiscNumber
  explicit?: Explicit
  trackArtist?: TrackArtist
  trackKey?: TrackKey
  song?: Song
}
