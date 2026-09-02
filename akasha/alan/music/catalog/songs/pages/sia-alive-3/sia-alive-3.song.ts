import type { Song } from "../../song.page-type.ts"

export const siaAlive3 = {
  id: "019ea4c6-6d40-7c03-8b76-a28f384ae1ac",
  pageTypeSlug: "song",
  slug: "sia-alive-3",
  title: "Alive",
  artistSlug: "sia",
  externalId: "faa011e0-d0f0-4754-a167-880eddd631d3",
  externalLink: "https://musicbrainz.org/work/faa011e0-d0f0-4754-a167-880eddd631d3",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  rank: "S",
  singability: "S-",
  tags: ["suicide"],
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
