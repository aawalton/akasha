import type { Song } from "../../song.page-type.ts"

export const arianaGrandeNasa = {
  id: "019ea4e7-ab9c-748c-b131-248087eab2de",
  pageTypeSlug: "song",
  slug: "ariana-grande-nasa",
  title: "NASA",
  artistSlug: "ariana-grande",
  externalId: "d62ba737-11ca-4ae3-bdf4-93b3205dd15e",
  externalLink: "https://musicbrainz.org/work/d62ba737-11ca-4ae3-bdf4-93b3205dd15e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
