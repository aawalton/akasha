import type { Song } from "../../song.page-type.ts"

export const taylorSwiftInvisible = {
  id: "019ea416-2cfc-7553-805f-ee247a9847f5",
  pageTypeSlug: "song",
  slug: "taylor-swift-invisible",
  title: "Invisible",
  artistSlug: "taylor-swift",
  externalId: "f94238cb-8ca5-4e9d-a240-bb4df4b89a7f",
  externalLink: "https://musicbrainz.org/work/f94238cb-8ca5-4e9d-a240-bb4df4b89a7f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
