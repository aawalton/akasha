import type { Song } from "../../song.page-type.ts"

export const taylorSwiftWood = {
  id: "019ea416-4286-7f80-8d99-f38881a00932",
  pageTypeSlug: "song",
  slug: "taylor-swift-wood",
  title: "Wood",
  artistSlug: "taylor-swift",
  externalId: "02ca474f-0f95-4e13-80e8-da6d957cce18",
  externalLink: "https://musicbrainz.org/work/02ca474f-0f95-4e13-80e8-da6d957cce18",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
