import type { Song } from "../../song.page-type.ts"

export const arianaGrandeWorstBehavior = {
  id: "019ea4e7-b7c8-7a3a-9ffe-d0e19328ae82",
  pageTypeSlug: "song",
  slug: "ariana-grande-worst-behavior",
  title: "worst behavior",
  artistSlug: "ariana-grande",
  externalId: "daf8e16f-1414-44c4-a0eb-0b26ed9d660d",
  externalLink: "https://musicbrainz.org/work/daf8e16f-1414-44c4-a0eb-0b26ed9d660d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
