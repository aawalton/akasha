import type { Song } from "../../song.page-type.ts"

export const siaOneMillionBullets = {
  id: "019ea4c8-02c3-77b5-a72b-ecbb5d4efbaf",
  pageTypeSlug: "song",
  slug: "sia-one-million-bullets",
  title: "One Million Bullets",
  artistSlug: "sia",
  externalId: "60552962-4585-4a7c-8f50-e5ebf03e7db1",
  externalLink: "https://musicbrainz.org/work/60552962-4585-4a7c-8f50-e5ebf03e7db1",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
