import type { Song } from "../../song.page-type.ts"

export const taylorSwiftPeter = {
  id: "019ea416-2f7f-7df6-997f-0dad346b4c4d",
  pageTypeSlug: "song",
  slug: "taylor-swift-peter",
  title: "Peter",
  artistSlug: "taylor-swift",
  externalId: "1da0b797-39ec-4920-bc60-ba655a5cf6ea",
  externalLink: "https://musicbrainz.org/work/1da0b797-39ec-4920-bc60-ba655a5cf6ea",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
