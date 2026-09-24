import type { PlayedAt } from "akasha/alan/chess/game/properties/played-at.instant-property.types.ts"
import type { ArtistName } from "akasha/alan/music/listening/heard-music/properties/tracks/properties/artist-name.text-property.types.ts"
import type { SpotifyTrackId } from "akasha/alan/music/listening/heard-music/properties/tracks/properties/spotify-track-id.text-property.types.ts"
import type { TrackName } from "akasha/alan/music/listening/heard-music/properties/tracks/properties/track-name.text-property.types.ts"
import type { FirstListen } from "akasha/alan/track/daily/day/properties/listens/properties/first-listen.boolean-property.types.ts"
import type { Minutes } from "akasha/alan/track/daily/day/properties/listens/properties/minutes.number-property.types.ts"
import type { NewMusicMinutes } from "akasha/alan/track/daily/day/properties/listens/properties/new-music-minutes.number-property.types.ts"
import type { PlayKey } from "akasha/alan/track/daily/day/properties/listens/properties/play-key.text-property.types.ts"
import type { Id } from "akasha/page/properties/id.text-property.types.ts"

export type Listens = "jsonl"

export type ListensRow = {
  id: Id
  playKey: PlayKey
  spotifyTrackId: SpotifyTrackId
  playedAt: PlayedAt
  trackName?: TrackName
  artistName?: ArtistName
  minutes?: Minutes
  firstListen?: FirstListen
  newMusicMinutes?: NewMusicMinutes
}
