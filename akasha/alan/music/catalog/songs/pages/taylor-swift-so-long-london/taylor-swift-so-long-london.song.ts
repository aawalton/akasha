import type { Song } from "../../song.page-type.ts"

export const taylorSwiftSoLongLondon = {
  id: "019ea416-3a77-7cfc-b4e9-4c2f036e9a97",
  pageTypeSlug: "song",
  slug: "taylor-swift-so-long-london",
  title: "So Long, London",
  artistSlug: "taylor-swift",
  externalId: "ab39894b-127f-4791-a3d5-408bcb7c9d4c",
  externalLink: "https://musicbrainz.org/work/ab39894b-127f-4791-a3d5-408bcb7c9d4c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
