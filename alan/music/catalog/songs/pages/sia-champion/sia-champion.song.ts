import type { Song } from "../../song.page-type.ts"

export const siaChampion = {
  id: "019ea4c5-ab64-7f86-8843-1d8e3fcd975e",
  pageTypeSlug: "song",
  slug: "sia-champion",
  title: "Champion",
  artistSlug: "sia",
  externalId: "c043b860-d3fc-4756-aab8-c789fdbdcb84",
  externalLink: "https://musicbrainz.org/work/c043b860-d3fc-4756-aab8-c789fdbdcb84",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
