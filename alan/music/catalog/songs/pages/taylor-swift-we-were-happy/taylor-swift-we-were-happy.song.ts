import type { Song } from "../../song.page-type.ts"

export const taylorSwiftWeWereHappy = {
  id: "019ea416-475d-7259-99e7-9dab7f73769d",
  pageTypeSlug: "song",
  slug: "taylor-swift-we-were-happy",
  title: "We Were Happy",
  artistSlug: "taylor-swift",
  externalId: "899e2daf-b467-4196-b645-c0ffcc157edb",
  externalLink: "https://musicbrainz.org/work/899e2daf-b467-4196-b645-c0ffcc157edb",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
