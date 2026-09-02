import type { Song } from "../../song.page-type.ts"

export const siaDayTooSoon = {
  id: "019ea4c2-f9e3-71ba-a503-29fba7e439d3",
  pageTypeSlug: "song",
  slug: "sia-day-too-soon",
  title: "Day Too Soon",
  artistSlug: "sia",
  externalId: "195e5f3f-02ba-4ebb-ad3d-aa4de92cb25e",
  externalLink: "https://musicbrainz.org/work/195e5f3f-02ba-4ebb-ad3d-aa4de92cb25e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
