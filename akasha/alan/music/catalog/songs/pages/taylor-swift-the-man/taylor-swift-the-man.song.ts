import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTheMan = {
  id: "019ea416-3382-7cbd-a1a3-d535535c55d9",
  pageTypeSlug: "song",
  slug: "taylor-swift-the-man",
  title: "The Man",
  artistSlug: "taylor-swift",
  externalId: "543dec53-ac04-4b41-a96e-f26b2ad8f02e",
  externalLink: "https://musicbrainz.org/work/543dec53-ac04-4b41-a96e-f26b2ad8f02e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
