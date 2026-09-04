import type { Song } from "../../song.page-type.ts"

export const taylorSwiftRobin = {
  id: "019ea416-3b12-752b-92e1-b2b6083e0ebd",
  pageTypeSlug: "song",
  slug: "taylor-swift-robin",
  title: "Robin",
  artistSlug: "taylor-swift",
  externalId: "b37a420f-876e-498f-aa2b-7f846695f407",
  externalLink: "https://musicbrainz.org/work/b37a420f-876e-498f-aa2b-7f846695f407",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
