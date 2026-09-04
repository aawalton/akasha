import type { Song } from "../../song.page-type.ts"

export const taylorSwiftGlitch = {
  id: "019ea416-28f1-7316-9a39-a6ee7d594362",
  pageTypeSlug: "song",
  slug: "taylor-swift-glitch",
  title: "Glitch",
  artistSlug: "taylor-swift",
  externalId: "be72a7cb-67b8-4551-8ed5-d8f0c9752e9e",
  externalLink: "https://musicbrainz.org/work/be72a7cb-67b8-4551-8ed5-d8f0c9752e9e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
