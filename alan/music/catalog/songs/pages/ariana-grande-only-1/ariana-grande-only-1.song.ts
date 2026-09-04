import type { Song } from "../../song.page-type.ts"

export const arianaGrandeOnly1 = {
  id: "019ea4e5-6e35-7ff6-a998-16e923236315",
  pageTypeSlug: "song",
  slug: "ariana-grande-only-1",
  title: "Only 1",
  artistSlug: "ariana-grande",
  externalId: "5d2b48a6-9d4a-445d-8292-5006d347b036",
  externalLink: "https://musicbrainz.org/work/5d2b48a6-9d4a-445d-8292-5006d347b036",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
