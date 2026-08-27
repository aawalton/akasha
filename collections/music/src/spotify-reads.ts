import type { CursorPage } from "@collections/music-spotify/client"
import {
  getTopArtists as spotifyTopArtists,
  getTopTracks as spotifyTopTracks,
  TIME_RANGES,
  type TimeRange,
  type TopArtist,
  type TopTrack,
} from "@collections/music-spotify/endpoints/personalization"
import {
  type currentlyPlayingSchema,
  type playHistorySchema,
  type RecentlyPlayedOptions,
  getCurrentlyPlaying as spotifyCurrentlyPlaying,
  getRecentlyPlayed as spotifyRecentlyPlayed,
} from "@collections/music-spotify/endpoints/player"
import type { z } from "zod"

export type { TimeRange, TopArtist, TopTrack }
export { TIME_RANGES }

export type PlayHistory = z.infer<typeof playHistorySchema>
export type CurrentlyPlaying = z.infer<typeof currentlyPlayingSchema>

export function getRecentlyPlayed(
  options: RecentlyPlayedOptions = {}
): Promise<CursorPage<PlayHistory>> {
  return spotifyRecentlyPlayed(options)
}

export function getCurrentlyPlaying(): Promise<CurrentlyPlaying | null> {
  return spotifyCurrentlyPlaying()
}

export function getTopArtists(window: TimeRange): Promise<TopArtist[]> {
  return spotifyTopArtists(window)
}

export function getTopTracks(window: TimeRange): Promise<TopTrack[]> {
  return spotifyTopTracks(window)
}
