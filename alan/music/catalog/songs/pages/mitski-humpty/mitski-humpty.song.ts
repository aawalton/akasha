import type { Song } from "../../song.page-type.ts"

export const mitskiHumpty = {
  id: "019f0ea3-b39d-702e-931c-a003d6f70658",
  pageTypeSlug: "song",
  slug: "mitski-humpty",
  title: "Humpty",
  artistSlug: "mitski",
  externalId: "8ff9b4b0-b9e8-4509-9e31-3cc1ff2d20f8",
  externalLink: "https://musicbrainz.org/work/8ff9b4b0-b9e8-4509-9e31-3cc1ff2d20f8",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
