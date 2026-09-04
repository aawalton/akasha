import type { Song } from "../../song.page-type.ts"

export const arianaGrandeMyHair = {
  id: "019ea4e8-5407-7732-8c21-71d2559cce42",
  pageTypeSlug: "song",
  slug: "ariana-grande-my-hair",
  title: "my hair",
  artistSlug: "ariana-grande",
  externalId: "f323d6ff-af12-473c-b5a4-fedac89e2549",
  externalLink: "https://musicbrainz.org/work/f323d6ff-af12-473c-b5a4-fedac89e2549",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
