import type { Song } from "../../song.page-type.ts"

export const siaWildOnes = {
  id: "019ea4cb-6891-7b3b-9d9f-e12e250c8088",
  pageTypeSlug: "song",
  slug: "sia-wild-ones",
  title: "Wild Ones",
  artistSlug: "sia",
  externalId: "2900b809-c5c4-4f99-884f-a60bd14c6cda",
  externalLink: "https://musicbrainz.org/work/2900b809-c5c4-4f99-884f-a60bd14c6cda",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
