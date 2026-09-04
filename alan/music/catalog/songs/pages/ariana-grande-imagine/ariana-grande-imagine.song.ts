import type { Song } from "../../song.page-type.ts"

export const arianaGrandeImagine = {
  id: "019ea4e0-e083-7841-aa6f-df100410ddc4",
  pageTypeSlug: "song",
  slug: "ariana-grande-imagine",
  title: "imagine",
  artistSlug: "ariana-grande",
  externalId: "332378d2-b629-4ec1-b4ae-a0c4c937b159",
  externalLink: "https://musicbrainz.org/work/332378d2-b629-4ec1-b4ae-a0c4c937b159",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
