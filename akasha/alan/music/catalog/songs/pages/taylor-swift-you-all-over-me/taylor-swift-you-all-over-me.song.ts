import type { Song } from "../../song.page-type.ts"

export const taylorSwiftYouAllOverMe = {
  id: "019ea416-4384-7518-a0b8-98d478c28fad",
  pageTypeSlug: "song",
  slug: "taylor-swift-you-all-over-me",
  title: "You All Over Me",
  artistSlug: "taylor-swift",
  externalId: "18da03fe-9375-4622-b14b-d29acb595085",
  externalLink: "https://musicbrainz.org/work/18da03fe-9375-4622-b14b-d29acb595085",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
