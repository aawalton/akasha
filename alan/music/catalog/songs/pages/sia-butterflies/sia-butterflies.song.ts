import type { Song } from "../../song.page-type.ts"

export const siaButterflies = {
  id: "019ea4c2-92cb-729c-a0cc-7f48e0184f52",
  pageTypeSlug: "song",
  slug: "sia-butterflies",
  title: "Butterflies",
  artistSlug: "sia",
  externalId: "04c0d176-6fe4-4c5c-ae7f-34c41c9499c0",
  externalLink: "https://musicbrainz.org/work/04c0d176-6fe4-4c5c-ae7f-34c41c9499c0",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
