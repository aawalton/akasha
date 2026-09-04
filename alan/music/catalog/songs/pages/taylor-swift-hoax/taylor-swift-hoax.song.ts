import type { Song } from "../../song.page-type.ts"

export const taylorSwiftHoax = {
  id: "019ea416-2319-75d5-a1d4-7f75d1364887",
  pageTypeSlug: "song",
  slug: "taylor-swift-hoax",
  title: "hoax",
  artistSlug: "taylor-swift",
  externalId: "899bb16d-7894-4234-bb4b-b21982bee084",
  externalLink: "https://musicbrainz.org/work/899bb16d-7894-4234-bb4b-b21982bee084",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
