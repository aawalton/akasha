import type { ArtistName } from "akasha/alan/music/listening/heard-music/properties/tracks/properties/artist-name.text-property.types.ts"
import type { FirstHeardAt } from "akasha/alan/music/listening/heard-music/properties/tracks/properties/first-heard-at.instant-property.types.ts"
import type { HeardSource } from "akasha/alan/music/listening/heard-music/properties/tracks/properties/heard-source.relation-property.types.ts"
import type { SpotifyTrackId } from "akasha/alan/music/listening/heard-music/properties/tracks/properties/spotify-track-id.text-property.types.ts"
import type { TitleKey } from "akasha/alan/music/listening/heard-music/properties/tracks/properties/title-key.text-property.types.ts"
import type { TrackName } from "akasha/alan/music/listening/heard-music/properties/tracks/properties/track-name.text-property.types.ts"
import type { Id } from "akasha/page/properties/id.text-property.types.ts"

export type Tracks = "jsonl"

export type TracksRow = {
  id: Id
  spotifyTrackId: SpotifyTrackId
  titleKey: TitleKey
  trackName?: TrackName
  artistName?: ArtistName
  firstHeardAt?: FirstHeardAt
  heardSource?: HeardSource
}
