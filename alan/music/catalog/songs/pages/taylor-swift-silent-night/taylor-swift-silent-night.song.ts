import type { Song } from "../../song.page-type.ts"

export const taylorSwiftSilentNight = {
  id: "019ea416-3450-74db-8997-6809889ddf4e",
  pageTypeSlug: "song",
  slug: "taylor-swift-silent-night",
  title: "Silent Night",
  artistSlug: "taylor-swift",
  externalId: "590e5567-c188-31f0-b7a8-a94e7e51c7b3",
  externalLink: "https://musicbrainz.org/work/590e5567-c188-31f0-b7a8-a94e7e51c7b3",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
