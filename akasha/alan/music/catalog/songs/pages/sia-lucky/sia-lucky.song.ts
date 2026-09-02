import type { Song } from "../../song.page-type.ts"

export const siaLucky = {
  id: "019ea4ca-6de9-7ff9-b26b-3d1f46d4c04b",
  pageTypeSlug: "song",
  slug: "sia-lucky",
  title: "Lucky",
  artistSlug: "sia",
  externalId: "fbc05650-dcc5-4f6a-a3b6-577ce11991c2",
  externalLink: "https://musicbrainz.org/work/fbc05650-dcc5-4f6a-a3b6-577ce11991c2",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
