import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTheAlchemy = {
  id: "019ea416-3fe6-7e6b-981f-c58c680acd44",
  pageTypeSlug: "song",
  slug: "taylor-swift-the-alchemy",
  title: "The Alchemy",
  artistSlug: "taylor-swift",
  externalId: "ebbfac52-42ca-48e1-b833-4b724c61bf75",
  externalLink: "https://musicbrainz.org/work/ebbfac52-42ca-48e1-b833-4b724c61bf75",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
