import type { Song } from "../../song.page-type.ts"

export const zaraLarssonSymphony = {
  id: "019ea49e-871f-7be2-a608-17d1720d8e88",
  pageTypeSlug: "song",
  slug: "zara-larsson-symphony",
  title: "Symphony",
  artistSlug: "zara-larsson",
  externalId: "2466c3b4-6c38-430b-aeb2-7fabee9918b9",
  externalLink: "https://musicbrainz.org/work/2466c3b4-6c38-430b-aeb2-7fabee9918b9",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
