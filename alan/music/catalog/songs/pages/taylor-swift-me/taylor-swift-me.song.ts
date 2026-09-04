import type { Song } from "../../song.page-type.ts"

export const taylorSwiftMe = {
  id: "019ea416-2c21-7a81-b2b0-2e75ae4b904e",
  pageTypeSlug: "song",
  slug: "taylor-swift-me",
  title: "ME!",
  artistSlug: "taylor-swift",
  externalId: "f58825b5-1983-4312-8b6b-a6cd366d395a",
  externalLink: "https://musicbrainz.org/work/f58825b5-1983-4312-8b6b-a6cd366d395a",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
