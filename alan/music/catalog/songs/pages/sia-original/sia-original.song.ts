import type { Song } from "../../song.page-type.ts"

export const siaOriginal = {
  id: "019ea4cc-1fb3-779e-a221-fa63e936e743",
  pageTypeSlug: "song",
  slug: "sia-original",
  title: "Original",
  artistSlug: "sia",
  externalId: "448bcf04-8514-4c9d-b650-54c4556ba784",
  externalLink: "https://musicbrainz.org/work/448bcf04-8514-4c9d-b650-54c4556ba784",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
