import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTheVeryFirstNight = {
  id: "019ea416-48b8-7915-9ef5-da87f3a00489",
  pageTypeSlug: "song",
  slug: "taylor-swift-the-very-first-night",
  title: "The Very First Night",
  artistSlug: "taylor-swift",
  externalId: "a90e8525-ada0-45cf-8d3c-bf2c55378ef7",
  externalLink: "https://musicbrainz.org/work/a90e8525-ada0-45cf-8d3c-bf2c55378ef7",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
