import type { Song } from "../../song.page-type.ts"

export const arianaGrandeSixThirty = {
  id: "019ea4e4-a34c-70d0-aa86-b4a24b0d3f8c",
  pageTypeSlug: "song",
  slug: "ariana-grande-six-thirty",
  title: "six thirty",
  artistSlug: "ariana-grande",
  externalId: "3bab5d21-bc9c-44a5-a6df-4945eb6f387c",
  externalLink: "https://musicbrainz.org/work/3bab5d21-bc9c-44a5-a6df-4945eb6f387c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
