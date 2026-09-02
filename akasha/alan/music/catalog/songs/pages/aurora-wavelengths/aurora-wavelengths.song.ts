import type { Song } from "../../song.page-type.ts"

export const auroraWavelengths = {
  id: "019ea4a5-c1eb-7a2e-9bfe-7afa4d83e9d4",
  pageTypeSlug: "song",
  slug: "aurora-wavelengths",
  title: "WAVELENGTHS",
  artistSlug: "aurora",
  externalId: "7178863d-3bed-4bb1-abcf-e3c907fc7505",
  externalLink: "https://musicbrainz.org/work/7178863d-3bed-4bb1-abcf-e3c907fc7505",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
