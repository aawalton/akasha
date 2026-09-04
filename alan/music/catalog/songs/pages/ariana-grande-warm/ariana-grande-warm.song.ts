import type { Song } from "../../song.page-type.ts"

export const arianaGrandeWarm = {
  id: "019ea4e7-57f0-7d1f-9380-e3843678d0b6",
  pageTypeSlug: "song",
  slug: "ariana-grande-warm",
  title: "warm",
  artistSlug: "ariana-grande",
  externalId: "c20288f0-aec2-4be4-a54a-71d687d5eed0",
  externalLink: "https://musicbrainz.org/work/c20288f0-aec2-4be4-a54a-71d687d5eed0",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
