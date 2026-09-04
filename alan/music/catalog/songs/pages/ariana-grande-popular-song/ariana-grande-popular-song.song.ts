import type { Song } from "../../song.page-type.ts"

export const arianaGrandePopularSong = {
  id: "019ea4e5-2be9-7783-9a2f-bff6ca2a8189",
  pageTypeSlug: "song",
  slug: "ariana-grande-popular-song",
  title: "Popular Song",
  artistSlug: "ariana-grande",
  externalId: "504fffb0-eddb-4768-aa59-18a5cd2b0ae9",
  externalLink: "https://musicbrainz.org/work/504fffb0-eddb-4768-aa59-18a5cd2b0ae9",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
