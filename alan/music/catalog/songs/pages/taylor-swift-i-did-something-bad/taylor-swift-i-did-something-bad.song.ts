import type { Song } from "../../song.page-type.ts"

export const taylorSwiftIDidSomethingBad = {
  id: "019ea416-2ac0-7b2a-b930-c5bd91375d90",
  pageTypeSlug: "song",
  slug: "taylor-swift-i-did-something-bad",
  title: "I Did Something Bad",
  artistSlug: "taylor-swift",
  externalId: "d878513a-c694-4d5c-8771-f3bf55f836ae",
  externalLink: "https://musicbrainz.org/work/d878513a-c694-4d5c-8771-f3bf55f836ae",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
