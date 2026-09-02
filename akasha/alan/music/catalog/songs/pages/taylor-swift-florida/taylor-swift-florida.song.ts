import type { Song } from "../../song.page-type.ts"

export const taylorSwiftFlorida = {
  id: "019ea416-2957-70a5-87d6-3ba48f8b9262",
  pageTypeSlug: "song",
  slug: "taylor-swift-florida",
  title: "Florida!!!",
  artistSlug: "taylor-swift",
  externalId: "c6d65b3c-9481-451a-8797-d3dc6d32e871",
  externalLink: "https://musicbrainz.org/work/c6d65b3c-9481-451a-8797-d3dc6d32e871",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
