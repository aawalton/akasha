import type { Song } from "../../song.page-type.ts"

export const zaraLarssonOnlyYou = {
  id: "019ea4a1-a9ae-7b85-afc4-f2fbeed16035",
  pageTypeSlug: "song",
  slug: "zara-larsson-only-you",
  title: "Only You",
  artistSlug: "zara-larsson",
  externalId: "d35db7a6-f7c2-4003-9ebf-40f41f214c11",
  externalLink: "https://musicbrainz.org/work/d35db7a6-f7c2-4003-9ebf-40f41f214c11",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
