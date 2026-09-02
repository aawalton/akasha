import type { Song } from "../../song.page-type.ts"

export const taylorSwiftSparksFly = {
  id: "019ea416-2f4c-7375-9f97-4cf14a9f8378",
  pageTypeSlug: "song",
  slug: "taylor-swift-sparks-fly",
  title: "Sparks Fly",
  artistSlug: "taylor-swift",
  externalId: "1c6b7922-2cd5-3e67-b6db-5e2d6c1dee9d",
  externalLink: "https://musicbrainz.org/work/1c6b7922-2cd5-3e67-b6db-5e2d6c1dee9d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
