import type { Song } from "../../song.page-type.ts"

export const siaWaterfall = {
  id: "019ea4cd-dd0a-70a8-b737-03aa5f82c731",
  pageTypeSlug: "song",
  slug: "sia-waterfall",
  title: "Waterfall",
  artistSlug: "sia",
  externalId: "b83dcb70-fbd8-4bb9-aefe-a6b25ebf0897",
  externalLink: "https://musicbrainz.org/work/b83dcb70-fbd8-4bb9-aefe-a6b25ebf0897",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
