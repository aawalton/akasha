import type { Song } from "../../song.page-type.ts"

export const kellyClarksonNostalgic = {
  id: "019ea4af-f683-7bd3-9913-4b224feaf477",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-nostalgic",
  title: "Nostalgic",
  artistSlug: "kelly-clarkson",
  externalId: "c5fdac11-3af8-4b94-b9c7-b2f0ce3764e1",
  externalLink: "https://musicbrainz.org/work/c5fdac11-3af8-4b94-b9c7-b2f0ce3764e1",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
