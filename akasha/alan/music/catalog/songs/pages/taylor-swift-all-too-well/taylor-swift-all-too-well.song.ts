import type { Song } from "../../song.page-type.ts"

export const taylorSwiftAllTooWell = {
  id: "019ea416-04da-7a02-9f6f-a41d50337755",
  pageTypeSlug: "song",
  slug: "taylor-swift-all-too-well",
  title: "All Too Well",
  artistSlug: "taylor-swift",
  externalId: "2a7ec633-1bdc-4d08-b75b-e462c3ee4a20",
  externalLink: "https://musicbrainz.org/work/2a7ec633-1bdc-4d08-b75b-e462c3ee4a20",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
