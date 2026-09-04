import type { Song } from "../../song.page-type.ts"

export const siaPlayground = {
  id: "019ea4cc-ff65-72e6-8dfa-e2aafb375257",
  pageTypeSlug: "song",
  slug: "sia-playground",
  title: "Playground",
  artistSlug: "sia",
  externalId: "83dd9d8a-240d-4380-b47f-1d6a167533de",
  externalLink: "https://musicbrainz.org/work/83dd9d8a-240d-4380-b47f-1d6a167533de",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
