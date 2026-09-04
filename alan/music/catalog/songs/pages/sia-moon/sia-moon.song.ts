import type { Song } from "../../song.page-type.ts"

export const siaMoon = {
  id: "019ea4c9-55fc-74b1-8809-86ee77e27298",
  pageTypeSlug: "song",
  slug: "sia-moon",
  title: "Moon",
  artistSlug: "sia",
  externalId: "99ca2f42-d7a1-4ac3-b374-288e67fdba7e",
  externalLink: "https://musicbrainz.org/work/99ca2f42-d7a1-4ac3-b374-288e67fdba7e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
