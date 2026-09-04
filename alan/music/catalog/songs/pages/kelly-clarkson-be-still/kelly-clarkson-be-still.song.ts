import type { Song } from "../../song.page-type.ts"

export const kellyClarksonBeStill = {
  id: "019ea4af-2c2e-72f4-b958-f8930c99ba88",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-be-still",
  title: "Be Still",
  artistSlug: "kelly-clarkson",
  externalId: "8ba8260e-f8b4-4aca-a03c-feeab5376275",
  externalLink: "https://musicbrainz.org/work/8ba8260e-f8b4-4aca-a03c-feeab5376275",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
