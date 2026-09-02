import type { Song } from "../../song.page-type.ts"

export const siaAlive = {
  id: "019ea4c3-1afc-7bc8-adc5-5e350646486f",
  pageTypeSlug: "song",
  slug: "sia-alive",
  title: "Alive",
  artistSlug: "sia",
  externalId: "1f23fb30-74b0-4d87-b3e4-0e580c6eb140",
  externalLink: "https://musicbrainz.org/work/1f23fb30-74b0-4d87-b3e4-0e580c6eb140",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
