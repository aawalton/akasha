import type { Song } from "../../song.page-type.ts"

export const taylorSwiftLoverRemix = {
  id: "019ea416-1826-7675-8ba0-c87092e7852c",
  pageTypeSlug: "song",
  slug: "taylor-swift-lover-remix",
  title: "Lover (remix)",
  artistSlug: "taylor-swift",
  externalId: "03955189-25c7-4763-b2e6-fa0a4abf1e70",
  externalLink: "https://musicbrainz.org/work/03955189-25c7-4763-b2e6-fa0a4abf1e70",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
