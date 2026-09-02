import type { Song } from "../../song.page-type.ts"

export const arianaGrandeBreathin = {
  id: "019ea4e1-1a8a-7a17-b844-34e41aa5d5b3",
  pageTypeSlug: "song",
  slug: "ariana-grande-breathin",
  title: "breathin",
  artistSlug: "ariana-grande",
  externalId: "3c1bfde3-719c-480d-a0e3-ef8ab749a5c3",
  externalLink: "https://musicbrainz.org/work/3c1bfde3-719c-480d-a0e3-ef8ab749a5c3",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
