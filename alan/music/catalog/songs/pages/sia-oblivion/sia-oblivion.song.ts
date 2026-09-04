import type { Song } from "../../song.page-type.ts"

export const siaOblivion = {
  id: "019ea4c9-8d07-74ea-9912-305a3c82346a",
  pageTypeSlug: "song",
  slug: "sia-oblivion",
  title: "Oblivion",
  artistSlug: "sia",
  externalId: "ad083a46-176d-4e07-b8ee-c0592cc43b81",
  externalLink: "https://musicbrainz.org/work/ad083a46-176d-4e07-b8ee-c0592cc43b81",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
