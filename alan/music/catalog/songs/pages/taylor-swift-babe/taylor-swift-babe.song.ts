import type { Song } from "../../song.page-type.ts"

export const taylorSwiftBabe = {
  id: "019ea416-0f63-7225-b2c8-8885523f0c51",
  pageTypeSlug: "song",
  slug: "taylor-swift-babe",
  title: "Babe",
  artistSlug: "taylor-swift",
  externalId: "9c84f0cb-f2ca-453b-8f6a-8757aac76e78",
  externalLink: "https://musicbrainz.org/work/9c84f0cb-f2ca-453b-8f6a-8757aac76e78",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
