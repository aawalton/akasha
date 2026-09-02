import type { Song } from "../../song.page-type.ts"

export const taylorSwiftLoveStory = {
  id: "019ea416-2991-7967-a7f8-be169198a2ac",
  pageTypeSlug: "song",
  slug: "taylor-swift-love-story",
  title: "Love Story",
  artistSlug: "taylor-swift",
  externalId: "c8975007-ba64-3e81-9a3c-69a3ba2fab95",
  externalLink: "https://musicbrainz.org/work/c8975007-ba64-3e81-9a3c-69a3ba2fab95",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
