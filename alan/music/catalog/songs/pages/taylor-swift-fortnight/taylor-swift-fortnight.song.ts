import type { Song } from "../../song.page-type.ts"

export const taylorSwiftFortnight = {
  id: "019ea416-25f3-7554-ad69-20b644de7bc2",
  pageTypeSlug: "song",
  slug: "taylor-swift-fortnight",
  title: "Fortnight",
  artistSlug: "taylor-swift",
  externalId: "9fdc1f4e-b3bf-4453-9d44-933d9937cb4a",
  externalLink: "https://musicbrainz.org/work/9fdc1f4e-b3bf-4453-9d44-933d9937cb4a",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
