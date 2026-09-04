import type { Song } from "../../song.page-type.ts"

export const arianaGrandeGoodAsHell = {
  id: "019ea4e3-d28d-767e-a3fc-fa255feda4d6",
  pageTypeSlug: "song",
  slug: "ariana-grande-good-as-hell",
  title: "Good as Hell",
  artistSlug: "ariana-grande",
  externalId: "e55c3b0e-e8e1-4794-9ff9-6967d4b577c2",
  externalLink: "https://musicbrainz.org/work/e55c3b0e-e8e1-4794-9ff9-6967d4b577c2",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
