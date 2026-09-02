import type { Song } from "../../song.page-type.ts"

export const arianaGrandeEternalSunshine = {
  id: "019ea4e0-81e8-75a7-b3a2-0691e951b9b1",
  pageTypeSlug: "song",
  slug: "ariana-grande-eternal-sunshine",
  title: "eternal sunshine",
  artistSlug: "ariana-grande",
  externalId: "10138ca6-66ca-407b-8ba0-8f754796ff07",
  externalLink: "https://musicbrainz.org/work/10138ca6-66ca-407b-8ba0-8f754796ff07",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
