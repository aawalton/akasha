import type { Song } from "../../song.page-type.ts"

export const zaraLarssonSoGood = {
  id: "019ea4a1-6eaf-7d3b-893f-b8fdf6f9dfb0",
  pageTypeSlug: "song",
  slug: "zara-larsson-so-good",
  title: "So Good",
  artistSlug: "zara-larsson",
  externalId: "c3544839-37a7-46f9-adce-dfeb8d2c95ce",
  externalLink: "https://musicbrainz.org/work/c3544839-37a7-46f9-adce-dfeb8d2c95ce",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
