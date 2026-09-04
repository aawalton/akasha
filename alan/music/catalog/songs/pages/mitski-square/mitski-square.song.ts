import type { Song } from "../../song.page-type.ts"

export const mitskiSquare = {
  id: "019f0e9e-1168-7ac9-93c7-860e4faa5898",
  pageTypeSlug: "song",
  slug: "mitski-square",
  title: "Square",
  artistSlug: "mitski",
  externalId: "2cf20ced-2166-4d1c-ae63-f372da062b73",
  externalLink: "https://musicbrainz.org/work/2cf20ced-2166-4d1c-ae63-f372da062b73",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
