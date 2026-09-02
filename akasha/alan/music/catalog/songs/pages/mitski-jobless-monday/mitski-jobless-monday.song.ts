import type { Song } from "../../song.page-type.ts"

export const mitskiJoblessMonday = {
  id: "019f0e9e-d4b8-74bd-ac4a-e6f6634d8a7a",
  pageTypeSlug: "song",
  slug: "mitski-jobless-monday",
  title: "Jobless Monday",
  artistSlug: "mitski",
  externalId: "399ab392-2409-4628-89ef-fa6bb16e4682",
  externalLink: "https://musicbrainz.org/work/399ab392-2409-4628-89ef-fa6bb16e4682",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
