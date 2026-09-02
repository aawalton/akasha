import type { Song } from "../../song.page-type.ts"

export const taylorSwift22 = {
  id: "019ea416-0261-73a9-8a1f-eafb9525ffaf",
  pageTypeSlug: "song",
  slug: "taylor-swift-22",
  title: "22",
  artistSlug: "taylor-swift",
  externalId: "014f3f6c-e2b0-4217-9e3c-89abf919648b",
  externalLink: "https://musicbrainz.org/work/014f3f6c-e2b0-4217-9e3c-89abf919648b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
