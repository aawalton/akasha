import type { Song } from "../../song.page-type.ts"

export const taylorSwiftLavenderHaze = {
  id: "019ea416-1e10-75c4-bb8c-63e01cc2ae8c",
  pageTypeSlug: "song",
  slug: "taylor-swift-lavender-haze",
  title: "Lavender Haze",
  artistSlug: "taylor-swift",
  externalId: "45e258a3-4552-442c-ba22-7e5a6899c3e8",
  externalLink: "https://musicbrainz.org/work/45e258a3-4552-442c-ba22-7e5a6899c3e8",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
