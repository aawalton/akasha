import type { Song } from "../../song.page-type.ts"

export const taylorSwiftStyle = {
  id: "019ea416-41b9-7e35-ac22-c6550ee641ba",
  pageTypeSlug: "song",
  slug: "taylor-swift-style",
  title: "Style",
  artistSlug: "taylor-swift",
  externalId: "f4dd8235-123f-4f53-ac07-1fc070016c06",
  externalLink: "https://musicbrainz.org/work/f4dd8235-123f-4f53-ac07-1fc070016c06",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
