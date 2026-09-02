import type { Song } from "../../song.page-type.ts"

export const arianaGrandeREM = {
  id: "019ea4e6-a62e-7116-8409-d12880fe32f5",
  pageTypeSlug: "song",
  slug: "ariana-grande-r-e-m",
  title: "R.E.M",
  artistSlug: "ariana-grande",
  externalId: "9ce41b08-6c87-4776-9dc6-aa645ee7b8c8",
  externalLink: "https://musicbrainz.org/work/9ce41b08-6c87-4776-9dc6-aa645ee7b8c8",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
