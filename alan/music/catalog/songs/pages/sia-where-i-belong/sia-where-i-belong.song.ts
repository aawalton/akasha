import type { Song } from "../../song.page-type.ts"

export const siaWhereIBelong = {
  id: "019ea4cd-0bf7-7eac-b08c-c40755e32e4e",
  pageTypeSlug: "song",
  slug: "sia-where-i-belong",
  title: "Where I Belong",
  artistSlug: "sia",
  externalId: "890b8894-41e9-4552-9ede-349a5c00347a",
  externalLink: "https://musicbrainz.org/work/890b8894-41e9-4552-9ede-349a5c00347a",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
