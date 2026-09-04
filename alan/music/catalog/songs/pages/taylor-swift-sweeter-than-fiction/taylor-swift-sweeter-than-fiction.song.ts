import type { Song } from "../../song.page-type.ts"

export const taylorSwiftSweeterThanFiction = {
  id: "019ea416-397c-74ca-b4bb-3ccfc15b94bd",
  pageTypeSlug: "song",
  slug: "taylor-swift-sweeter-than-fiction",
  title: "Sweeter Than Fiction",
  artistSlug: "taylor-swift",
  externalId: "9c15e68c-eb64-4e6b-932d-813057aea16e",
  externalLink: "https://musicbrainz.org/work/9c15e68c-eb64-4e6b-932d-813057aea16e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
