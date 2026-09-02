import type { Song } from "../../song.page-type.ts"

export const taylorSwiftStateOfGrace = {
  id: "019ea416-362e-72fa-9d0b-c2096a0f4f15",
  pageTypeSlug: "song",
  slug: "taylor-swift-state-of-grace",
  title: "State of Grace",
  artistSlug: "taylor-swift",
  externalId: "65bdb1d3-a969-4dde-967a-9cfa67d0168c",
  externalLink: "https://musicbrainz.org/work/65bdb1d3-a969-4dde-967a-9cfa67d0168c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
