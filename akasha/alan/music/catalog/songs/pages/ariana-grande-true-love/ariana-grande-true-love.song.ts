import type { Song } from "../../song.page-type.ts"

export const arianaGrandeTrueLove = {
  id: "019ea4e7-0bf3-7adf-a07a-484633c40cc5",
  pageTypeSlug: "song",
  slug: "ariana-grande-true-love",
  title: "True Love",
  artistSlug: "ariana-grande",
  externalId: "a9e509b1-f1f8-4a7a-8593-5d03daae408b",
  externalLink: "https://musicbrainz.org/work/a9e509b1-f1f8-4a7a-8593-5d03daae408b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
