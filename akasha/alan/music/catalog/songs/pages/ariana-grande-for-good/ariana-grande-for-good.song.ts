import type { Song } from "../../song.page-type.ts"

export const arianaGrandeForGood = {
  id: "019ea4e3-8441-71b4-9570-280f35780c13",
  pageTypeSlug: "song",
  slug: "ariana-grande-for-good",
  title: "For Good",
  artistSlug: "ariana-grande",
  externalId: "e0259bdb-17bf-4ba0-bcaf-5a7d2014857b",
  externalLink: "https://musicbrainz.org/work/e0259bdb-17bf-4ba0-bcaf-5a7d2014857b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
