import type { Song } from "../../song.page-type.ts"

export const taylorSwiftBirch = {
  id: "019ea416-15da-78f9-aab4-7bfa4e88aac4",
  pageTypeSlug: "song",
  slug: "taylor-swift-birch",
  title: "Birch",
  artistSlug: "taylor-swift",
  externalId: "d3af16c7-29bc-443a-a3b3-99a4c001cb0b",
  externalLink: "https://musicbrainz.org/work/d3af16c7-29bc-443a-a3b3-99a4c001cb0b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
