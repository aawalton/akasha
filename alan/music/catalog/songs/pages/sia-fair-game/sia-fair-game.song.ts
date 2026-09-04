import type { Song } from "../../song.page-type.ts"

export const siaFairGame = {
  id: "019ea4c6-516e-758b-a354-44dcfec3cc00",
  pageTypeSlug: "song",
  slug: "sia-fair-game",
  title: "Fair Game",
  artistSlug: "sia",
  externalId: "eb8fb54c-23df-4d2a-85ad-895ee8c4d1a6",
  externalLink: "https://musicbrainz.org/work/eb8fb54c-23df-4d2a-85ad-895ee8c4d1a6",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
