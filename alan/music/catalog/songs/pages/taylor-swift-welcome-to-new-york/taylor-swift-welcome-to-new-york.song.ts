import type { Song } from "../../song.page-type.ts"

export const taylorSwiftWelcomeToNewYork = {
  id: "019ea416-4aaa-70c8-bebb-c4af64a7e7c6",
  pageTypeSlug: "song",
  slug: "taylor-swift-welcome-to-new-york",
  title: "Welcome to New York",
  artistSlug: "taylor-swift",
  externalId: "c97e9e09-1576-4767-b53d-0ebf8b0dc5bb",
  externalLink: "https://musicbrainz.org/work/c97e9e09-1576-4767-b53d-0ebf8b0dc5bb",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
