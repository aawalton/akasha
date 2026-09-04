import type { Song } from "../../song.page-type.ts"

export const zaraLarssonMemoryLane = {
  id: "019ea49e-9059-7270-817a-7f0042d714c1",
  pageTypeSlug: "song",
  slug: "zara-larsson-memory-lane",
  title: "Memory Lane",
  artistSlug: "zara-larsson",
  externalId: "27ace0fb-2564-40b9-b669-0b1ffdf0bb77",
  externalLink: "https://musicbrainz.org/work/27ace0fb-2564-40b9-b669-0b1ffdf0bb77",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
