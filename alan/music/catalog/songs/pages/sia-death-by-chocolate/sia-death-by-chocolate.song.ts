import type { Song } from "../../song.page-type.ts"

export const siaDeathByChocolate = {
  id: "019ea4c6-632a-7a7a-a7e8-213906ba96cf",
  pageTypeSlug: "song",
  slug: "sia-death-by-chocolate",
  title: "Death by Chocolate",
  artistSlug: "sia",
  externalId: "f616bca6-7d4e-4ca2-83d8-ac226745f03d",
  externalLink: "https://musicbrainz.org/work/f616bca6-7d4e-4ca2-83d8-ac226745f03d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
