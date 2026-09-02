import type { Song } from "../../song.page-type.ts"

export const siaILoveIt = {
  id: "019ea4c6-e7ad-71ae-a859-f43cbcb30e8d",
  pageTypeSlug: "song",
  slug: "sia-i-love-it",
  title: "I Love It",
  artistSlug: "sia",
  externalId: "12f08b1a-f432-4e6b-85a7-3b0d206fc633",
  externalLink: "https://musicbrainz.org/work/12f08b1a-f432-4e6b-85a7-3b0d206fc633",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
