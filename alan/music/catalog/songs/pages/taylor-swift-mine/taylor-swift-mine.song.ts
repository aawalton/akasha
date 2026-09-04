import type { Song } from "../../song.page-type.ts"

export const taylorSwiftMine = {
  id: "019ea416-3154-7ea4-8f6a-ba23b6e9442c",
  pageTypeSlug: "song",
  slug: "taylor-swift-mine",
  title: "Mine",
  artistSlug: "taylor-swift",
  externalId: "3b86f1da-4c28-3da1-8f90-632e62e7b521",
  externalLink: "https://musicbrainz.org/work/3b86f1da-4c28-3da1-8f90-632e62e7b521",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
