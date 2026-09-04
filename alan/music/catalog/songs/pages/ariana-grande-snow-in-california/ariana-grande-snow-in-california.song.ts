import type { Song } from "../../song.page-type.ts"

export const arianaGrandeSnowInCalifornia = {
  id: "019ea4e5-0ca2-7ee5-8243-eae22684c932",
  pageTypeSlug: "song",
  slug: "ariana-grande-snow-in-california",
  title: "Snow in California",
  artistSlug: "ariana-grande",
  externalId: "4bd0921e-537d-405a-b9df-00ffcdd393ab",
  externalLink: "https://musicbrainz.org/work/4bd0921e-537d-405a-b9df-00ffcdd393ab",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
