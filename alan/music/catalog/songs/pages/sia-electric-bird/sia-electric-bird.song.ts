import type { Song } from "../../song.page-type.ts"

export const siaElectricBird = {
  id: "019ea4c6-2cfb-7eb5-9a3b-343c05fdfb67",
  pageTypeSlug: "song",
  slug: "sia-electric-bird",
  title: "Electric Bird",
  artistSlug: "sia",
  externalId: "db2f8b36-b3d4-4d0b-a2e8-97ba1510fa32",
  externalLink: "https://musicbrainz.org/work/db2f8b36-b3d4-4d0b-a2e8-97ba1510fa32",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
