import type { Song } from "../../song.page-type.ts"

export const siaTitanium = {
  id: "019ea4cb-7676-70dd-b865-fe24bb1aea0c",
  pageTypeSlug: "song",
  slug: "sia-titanium",
  title: "Titanium",
  artistSlug: "sia",
  externalId: "29fd6a5f-8c0e-4512-9d1f-c065bf614104",
  externalLink: "https://musicbrainz.org/work/29fd6a5f-8c0e-4512-9d1f-c065bf614104",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
