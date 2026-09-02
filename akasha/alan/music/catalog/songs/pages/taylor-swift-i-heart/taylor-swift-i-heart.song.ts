import type { Song } from "../../song.page-type.ts"

export const taylorSwiftIHeart = {
  id: "019ea416-20f0-7bed-be51-b483fa92fa50",
  pageTypeSlug: "song",
  slug: "taylor-swift-i-heart",
  title: "I Heart ?",
  artistSlug: "taylor-swift",
  externalId: "6e896a62-9676-4c13-97b7-9f792fb4cb86",
  externalLink: "https://musicbrainz.org/work/6e896a62-9676-4c13-97b7-9f792fb4cb86",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
