import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTwoIsBetterThanOne = {
  id: "019ea416-4505-790f-a1c7-8bf115744da6",
  pageTypeSlug: "song",
  slug: "taylor-swift-two-is-better-than-one",
  title: "Two Is Better Than One",
  artistSlug: "taylor-swift",
  externalId: "487d9b03-a3bf-4963-86b3-8030d1a9f73f",
  externalLink: "https://musicbrainz.org/work/487d9b03-a3bf-4963-86b3-8030d1a9f73f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
