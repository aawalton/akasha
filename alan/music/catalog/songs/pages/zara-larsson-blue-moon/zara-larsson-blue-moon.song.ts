import type { Song } from "../../song.page-type.ts"

export const zaraLarssonBlueMoon = {
  id: "019ea4a0-3a78-70ce-9460-1926c3157bb5",
  pageTypeSlug: "song",
  slug: "zara-larsson-blue-moon",
  title: "Blue Moon",
  artistSlug: "zara-larsson",
  externalId: "851c2c67-affd-44ed-bab9-e1f7ac7b26d6",
  externalLink: "https://musicbrainz.org/work/851c2c67-affd-44ed-bab9-e1f7ac7b26d6",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
