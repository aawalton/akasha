import type { Song } from "../../song.page-type.ts"

export const zaraLarssonWords = {
  id: "019ea49f-0fd6-71c1-8a18-a5455793a37f",
  pageTypeSlug: "song",
  slug: "zara-larsson-words",
  title: "Words",
  artistSlug: "zara-larsson",
  externalId: "45dc502d-159e-4db2-8868-399656c7d61c",
  externalLink: "https://musicbrainz.org/work/45dc502d-159e-4db2-8868-399656c7d61c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
