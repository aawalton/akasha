import type { Song } from "../../song.page-type.ts"

export const arianaGrandeGhostin = {
  id: "019ea4e2-e604-7b0d-9f20-448200112800",
  pageTypeSlug: "song",
  slug: "ariana-grande-ghostin",
  title: "ghostin",
  artistSlug: "ariana-grande",
  externalId: "bba54d4b-35e9-4703-b763-7c15aeeda3bc",
  externalLink: "https://musicbrainz.org/work/bba54d4b-35e9-4703-b763-7c15aeeda3bc",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
