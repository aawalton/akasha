import type { Song } from "../../song.page-type.ts"

export const taylorSwiftWhiteHorse = {
  id: "019ea416-4b42-7adf-b3c6-d61026d8303e",
  pageTypeSlug: "song",
  slug: "taylor-swift-white-horse",
  title: "White Horse",
  artistSlug: "taylor-swift",
  externalId: "d643d8f1-3d27-31d7-bc16-d863d7a3f9f9",
  externalLink: "https://musicbrainz.org/work/d643d8f1-3d27-31d7-bc16-d863d7a3f9f9",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
